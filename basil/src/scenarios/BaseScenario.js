import ui.View;
import ui.ImageView;
import ui.resource.Image;
import AudioManager;

import src.views.FillScreenImageView as FillScreenImageView;
import src.views.PlayfieldView as PlayfieldView;
import src.models.Player.Player as Player;
import src.models.GameDispatcher as GameDispatcher;

import src.lib.FW_NamedContactListener as FW.NamedContactListener;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;
import src.lib.FW_Math as FW.Math;

var DEBUG = true;

exports = Class(function(supr) {
  this.init = function(superview) {
    // Set up the game loop event dispatcher
    this.setupDispatcher();

    // Pretty background, TODO: Change this, parallax or something
    this.setupBackground(superview);

    // Panning surface for graphics
    this.setupPlayfield(superview);

    // Set up the audio manager
    this.setupAudioManager();

    // Set up the world of the physics simulation
    this.setupPhysics();

    // Add the player to the scene graph and physics simulation
    this.setupPlayer();

    // Observe and dispatch input events in relation to player position
    this.setupPlayerInputHandlers();
  };

  this.setupPlayfield = function(superview) {
    var playfield = new PlayfieldView(this.gameDispatcher, {
      superview: superview
      // width: opts.superview.style.width,
      // height: opts.superview.style.height
    });

    this.playfield = playfield;
    this.overlay = new ui.View({ superview: superview, });
  };

  this.setupDispatcher = function() {
    var gameDispatcher = new GameDispatcher();
    this.gameDispatcher = gameDispatcher;

    gameDispatcher.onTick(this.reframeCamera, this);
    gameDispatcher.onTick(this.attemptShoot, this);
    gameDispatcher.onTick(this.stepPhysics, this);
  };

  this.setupAudioManager = function() {
    this.audioManager = new AudioManager({ path: "resources/sounds" });
  };

  this.setupPhysics = function() {
    var contactListener = new FW.NamedContactListener();
    this.contactListener = contactListener;

    var world = new Box2D.Dynamics.b2World(
      new Box2D.Common.Math.b2Vec2(0, 0), // no gravity
      true // allow sleep
    );

    this.world = world;

    world.SetContactListener(contactListener);

    if (DEBUG) {
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
    }
  };




  this.setupBackground = function(superview) {
    new FillScreenImageView({
      superview: superview,
      image: "resources/images/bg001.png"
    });
  };

  this.setupPlayer = function() {
    var player = new Player(this.gameDispatcher, this.world, this.playfield);

    this.player = player;
  };

  this.setupPlayerInputHandlers = function() {
    var scenario  = this,
        overlay   = this.overlay,
        playfield = this.playfield,
        player    = this.player;

    overlay.on("InputStart", function(event, point) {
      scenario.playerShooting = true;
    });

    overlay.on("InputSelect", function() {
      scenario.playerShooting = false;
    });

    overlay.on("DragStop", function() {
      scenario.playerShooting = false;
    });

    overlay.on("InputMove", function(event, point) {
      playfield.localizePoint(point);
      var pp = player.getPosition(),
          angle = Math.atan2(point.y - pp.y, point.x - pp.x),
          distance = FW.Math.distance(pp.x, pp.y, point.x, point.y);

      player.pointAt(angle, distance);
    });
  };


  this.reframeCamera = function() {
    var superview = this.playfield.getSuperview(),
        superviewStyle = superview.style,
        styleWidth = superviewStyle.width,
        styleHeight = superviewStyle.height,
        styleScale = superviewStyle.scale;

    var playerPosition = this.player.getPosition(),
        x = playerPosition.x,
        y = playerPosition.y,
        zoomRadius = this.zoomRadius(),
        minDimension = Math.min(styleWidth, styleHeight),
        playfieldScale = minDimension / 2 / zoomRadius;

    this.playfield.style.update({
      x: styleWidth / 2,
      y: styleHeight / 2,
      offsetX: -x,
      offsetY: -y,
      anchorX: x,
      anchorY: y,
      scale: playfieldScale,
      width: 10,
      height: 10
    });

    if (this.debugDraw) {
      this.debugDraw.SetDrawScale(playfieldScale * styleScale);
      this.debugDraw.SetDrawTranslate(new Box2D.Common.Math.b2Vec2(
        -playerPosition.x + styleWidth / 2 / playfieldScale,
        -playerPosition.y + styleHeight / 2 / playfieldScale
      ));
    }

    var overlay = this.overlay;
    overlay.style.width = superviewStyle.width;
    overlay.style.height = superviewStyle.height;
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

  // This is meant to be overridden on a per-Scenario basis
  this.zoomRadius = function() {
    return 1;
  };

});
