import ui.ImageView;
import ui.SpriteView;
import ui.resource.Image;
import ui.View;

import src.views.FillScreenImageView as FillScreenImageView;
import src.models.Player.Player as Player;
import src.models.AsteroidGenerator as AsteroidGenerator;

import src.lib.FW_Dispatcher as FW.Dispatcher;
import src.lib.FW_GameClosureDevice as FW.GameClosureDevice;
import src.lib.FW_NamedContactListener as FW.NamedContactListener;
// import src.lib.FW_CleanupAccumulator as FW.CleanupAccumulator;
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
      superview: this,
      layout: "box",
      scale: 12
    });

    // Set up the game loop event dispatcher
    this.setupDispatcher();

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


  this.setupPhysics = function() {
    var contactListener = new FW.NamedContactListener();

    var world = new Box2D.Dynamics.b2World(
      new Box2D.Common.Math.b2Vec2(0, 0), // no gravity
      true // allow sleep
    );

    this.world = world;

    world.SetContactListener(contactListener);

    // We need this playfield reference only for adding explosions,
    // TODO: Remove when we move the explosion drawing stuff out
    var playfield = this.playfield;
    var gameplayView = this;
    contactListener.registerContactListener(
      "bullet001", "Asteroid",
      function() {}, // beginContactListener
      function() {}, // endContactListener
      function() {}, // preSolveListener
      function(contact, manifold) { // postSolveListener
        // console.log("contact: %o, manifold: %o", contact, manifold);

        // Determine collision location and strength
        var collisionStrength = manifold.normalImpulses[0],
            collisionLocation,
            worldManifold = new Box2D.Collision.b2WorldManifold();
        // Populate world manifold structure and extract collision location
        contact.GetWorldManifold(worldManifold);
        collisionLocation = worldManifold.m_points[0];

        // onBulletAsteroidCollision(collisionStrength, collisionLocation);
        // console.log("strength: %o", strength);

        // debugger;
        // var bullet = bulletFixture.GetUserData();
        // var asteroid = asteroidFixture.GetUserData();

        // var strength = impact.GetManifold().m_points[0].m_normalImpulse;

        // console.log("impact: %o, bullet: %o, asteroid: %o", impact, bullet, asteroid);
        // console.log("strength: %o", strength);

        var explosionView = new ui.SpriteView({
          url: "resources/images/animations/explosions",
          defaultAnimation: "explode",
          superview: playfield,
          x: collisionLocation.x,
          y: collisionLocation.y,
          frameRate: 30,
          autoStart: true,
          loop: false,

          autoSize: true,
          scale: collisionStrength / 5,
          centerAnchor: true,
          layout: "box"
        });

        // gameplayView.stopStepping = true;

      }
    );
    // contactListener.registerContactListener(
    //   "bullet001", "Asteroid",
    //   function(impact, bulletFixture, asteroidFixture) {
    //     var bullet = bulletFixture.GetUserData();
    //     var asteroid = asteroidFixture.GetUserData();

    //   }
    // );
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
    var player = new Player(this.world, this.playfield);

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
    this.player.processTime(dt);
    this.asteroidGenerator.processTime(dt);

    var playerPosition = this.player.getPosition(),
        furthestAsteroidDistance = this.asteroidGenerator.furthestAsteroidDistance(),
        playfieldScale = FW.GameClosureDevice.getMinDimension() / 2 / furthestAsteroidDistance;

    this.playfield.style.update({
      scale: playfieldScale,
      x: this.style.width / 2 - playerPosition.x * playfieldScale,
      y: this.style.height / 2 - playerPosition.y * playfieldScale
    });

    if (this.playerShooting) {
      this.player.shoot();
    }

    // Step the physics simulation, handling collions and the like
    if (!this.stopStepping) {
      this.world.Step(0.1, 10, 10);
    }

    this.dispatcher.trigger("tick");
  };

});
