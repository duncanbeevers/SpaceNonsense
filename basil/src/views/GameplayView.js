import ui.ImageView;
import ui.resource.Image;
import ui.View;
import AudioManager;

import src.interactions.BulletImpactsAsteroid as BulletImpactsAsteroid;
import src.interactions.BulletImpactsBullet as BulletImpactsBullet;
import src.views.FillScreenImageView as FillScreenImageView;
import src.models.Player.Player as Player;
import src.models.AsteroidGenerator as AsteroidGenerator;
import src.models.GameDispatcher as GameDispatcher;

import src.lib.FW_GameClosureDevice as FW.GameClosureDevice;
import src.lib.FW_NamedContactListener as FW.NamedContactListener;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(ui.View, function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      width: 576,
      height: 1024
    });

    supr(this, "init", [opts]);

    // Pretty background, TODO: Change this, parallax or something
    this.setupBackground();

    // Panning surface for graphics
    this.playfield = new ui.View({ superview: this });

    // Set up the game loop event dispatcher
    this.setupDispatcher();

    // Set up the audio manager
    this.setupAudioManager();

    // Set up the world of the physics simulation
    this.setupPhysics();

    // Add the player to the scene graph and physics simulation
    this.setupPlayer();

    // Make the Asteroid Generator
    this.setupAsteroidGenerator();

    this.gameDispatcher.onTick(this.reframeCamera, this);
    this.gameDispatcher.onTick(this.attemptShoot, this);
    this.gameDispatcher.onTick(this.stepPhysics, this);
  };

  this.setupDispatcher = function() {
    this.gameDispatcher = new GameDispatcher();
  };

  this.setupAudioManager = function() {
    this.audioManager = new AudioManager({ path: "resources/sounds" });
  };

  this.setupPhysics = function() {
    var contactListener = new FW.NamedContactListener();

    var world = new Box2D.Dynamics.b2World(
      new Box2D.Common.Math.b2Vec2(0, 0), // no gravity
      true // allow sleep
    );

    this.world = world;

    world.SetContactListener(contactListener);

    // Encapsulate collision interaction in its own class
    var bulletImpactsAsteroid = new BulletImpactsAsteroid();
    bulletImpactsAsteroid.register(this.playfield, contactListener, this.audioManager);
    var bulletImpactsBullet = new BulletImpactsBullet();
    bulletImpactsBullet.register(this.playfield, contactListener, this.audioManager);


    // Set up debugDraw for box2d
    var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    var gameClosureCanvas = document.querySelectorAll("canvas")[1];
    var debugCanvas = document.createElement("canvas");
    debugCanvas.setAttribute("width", gameClosureCanvas.getAttribute("width"));
    debugCanvas.setAttribute("height", gameClosureCanvas.getAttribute("height"));
    debugCanvas.style.display = "block";
    gameClosureCanvas.style.display  = "block";
    gameClosureCanvas.style.position = "absolute";
    gameClosureCanvas.style.top      = "0";
    gameClosureCanvas.style.left     = "0";
    gameClosureCanvas.style.opacity  = "0.5";
    gameClosureCanvas.parentNode.appendChild(debugCanvas);

    var debugContext = debugCanvas.getContext("2d");
    var debugDraw = new b2DebugDraw();

    debugDraw.SetSprite(debugContext);
    debugDraw.SetFillAlpha(1);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(
      b2DebugDraw.e_shapeBit        |
      // b2DebugDraw.e_jointBit        |
      // b2DebugDraw.e_aabbBit         |
      b2DebugDraw.e_centerOfMassBit |
      // b2DebugDraw.e_coreShapeBit    |
      // b2DebugDraw.e_jointBit        |
      // b2DebugDraw.e_obbBit          |
      // b2DebugDraw.e_pairBit         |
      0
    );
    world.SetDebugDraw(debugDraw);
    this.debugDraw = debugDraw;
  };




  this.setupBackground = function() {
    new FillScreenImageView({
      superview: this,
      image: "resources/images/bg001.png"
    });
  };

  this.setupPlayer = function() {
    // Create a placeholder for the player data
    // TODO: Move all this functionality into a Player class
    var player = new Player(this.gameDispatcher, this.world, this.playfield);

    this.player = player;

    this.on("InputSelect", function() {
      this.playerShooting = false;
    });

    this.on("DragStop", function() {
      this.playerShooting = false;
    });

    this.on("InputStart", function(event, point) {
      this.playerShooting = 'bullet001';
    });

    this.on("InputOver", function(event, point) {
      this.playerShooting = false;
    });

    this.on("InputMove", function(event, point) {
      var playerPosition = this.player.getPosition(),
          angle = Math.atan2(
        point.y - playerPosition.y * this.playfield.style.scale - this.playfield.style.y,
        point.x - playerPosition.x * this.playfield.style.scale - this.playfield.style.x
      );

      this.player.pointAt(angle);
    });


  };


  this.setupAsteroidGenerator = function() {
    var asteroidGenerator = new AsteroidGenerator(this.gameDispatcher, this.audioManager, this.playfield, this.player, this.world);
    this.asteroidGenerator = asteroidGenerator;
  };

  // Hook into GameClosure tick function, forward to GameDispatcher
  this.tick = function(dt) {
    this.gameDispatcher.tick(dt);
  };

  this.reframeCamera = function() {
    var playerPosition = this.player.getPosition(),
        furthestAsteroidDistance = this.asteroidGenerator.furthestAsteroidDistance(),
        playfieldScale = FW.GameClosureDevice.getMinDimension() / 1.3 / furthestAsteroidDistance,
        x = FW.GameClosureDevice.getWidth() / 2 - playerPosition.x * playfieldScale,
        y = FW.GameClosureDevice.getHeight() / 2 - playerPosition.y * playfieldScale;

    this.playfield.style.update({ scale: playfieldScale, x: x, y: y });

    if (this.debugDraw) {
      this.debugDraw.SetDrawScale(playfieldScale);
      this.debugDraw.SetDrawTranslate(new Box2D.Common.Math.b2Vec2(
        -playerPosition.x + FW.GameClosureDevice.getWidth() / 2 / playfieldScale,
        -playerPosition.y + FW.GameClosureDevice.getHeight() / 2 / playfieldScale
      ));
    }
  };

  this.attemptShoot = function() {
    if (this.playerShooting) {
      this.player.shoot();
    }
  };

  this.stepPhysics = function() {
    // Step the physics simulation, handling collions and the like
    if (!this.stopStepping) {
      this.world.Step(0.1, 10, 10);
      if (this.debugDraw) {
        this.world.DrawDebugData();
      }
    }

  };

});
