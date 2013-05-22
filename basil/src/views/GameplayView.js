import ui.ImageView;
import ui.resource.Image;
import ui.View;
import AudioManager;

import src.interactions.BulletImpactsAsteroid as BulletImpactsAsteroid;
import src.views.FillScreenImageView as FillScreenImageView;
import src.models.Player.Player as Player;
import src.models.AsteroidGenerator as AsteroidGenerator;

import src.lib.FW_Dispatcher as FW.Dispatcher;
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
    this.playfield = new ui.View({
      superview: this
    });

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
  };

  this.setupDispatcher = function() {
    this.dispatcher = new FW.Dispatcher();
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
    var bulletImpactsAsteroid = new BulletImpactsAsteroid(this.playfield);
    bulletImpactsAsteroid.register(contactListener, this.audioManager);
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
    var player = new Player(this.dispatcher, this.world, this.playfield);

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
    var asteroidGenerator = new AsteroidGenerator(this.dispatcher, this.playfield, this.player, this.world);
    this.asteroidGenerator = asteroidGenerator;
  };



  this.tick = function(dt) {
    var playerPosition = this.player.getPosition(),
        furthestAsteroidDistance = this.asteroidGenerator.furthestAsteroidDistance(),
        playfieldScale = FW.GameClosureDevice.getMinDimension() / 1.3 / furthestAsteroidDistance;

    this.playfield.style.update({
      scale: playfieldScale,
      x: FW.GameClosureDevice.getWidth() / 2 - playerPosition.x * playfieldScale,
      y: FW.GameClosureDevice.getHeight() / 2 - playerPosition.y * playfieldScale
    });

    if (this.playerShooting) {
      this.player.shoot();
    }

    // Step the physics simulation, handling collions and the like
    if (!this.stopStepping) {
      this.world.Step(0.1, 10, 10);
    }

    this.dispatcher.trigger("tick", dt);
    this.dispatcher.trigger("PhysicsViewSync");
  };

});
