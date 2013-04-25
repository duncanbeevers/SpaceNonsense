import ui.ImageView;
import ui.resource.Image;
import ui.View;

import src.views.FillScreenImageView as FillScreenImageView;
import src.views.PlayerView as PlayerView;
import src.AsteroidGenerator as AsteroidGenerator;

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
      superview: this,
      layout: "box",
      scale: 10
    });

    // Set up the world of the physics simulation
    this.setupPhysics();

    // Add the player to the scene graph and physics simulation
    this.setupPlayer();

    // Make the Asteroid Generator
    this.setupAsteroidGenerator();
  };






  this.setupPhysics = function() {
    var contactListener = new FW.NamedContactListener();

    var world = new Box2D.Dynamics.b2World(
      new Box2D.Common.Math.b2Vec2(0, 0), // no gravity
      true // allow sleep
    );

    this.world = world;

    world.SetContactListener(contactListener);

    contactListener.registerContactListener(
      "bullet001", "Asteroid",
      function(impact, bulletFixture, asteroidFixture) {
        // Handle impact
      });
  };








  this.setupBackground = function() {
    new FillScreenImageView({
      superview: this,
      image: "resources/images/bg001.png"
    });
  };

  var player, playerImageView;
  this.setupPlayer = function() {
    // Create a placeholder for the player data
    // TODO: Move all this functionality into a Player class
    var playerImageView = new PlayerView(this.world, { superview: this.playfield });

    this.player = playerImageView;

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
      var pointAt = Math.atan2(
        point.y - this.player.style.y - this.playfield.style.y,
        point.x - this.player.style.x - this.playfield.style.x
      );

      this.player.style.r = pointAt;
    });


  };



  this.setupAsteroidGenerator = function() {
    var asteroidGenerator = new AsteroidGenerator(this.playfield, this.player, this.world);
    this.asteroidGenerator = asteroidGenerator;
  };



  this.tick = function(dt) {
    // TODO: Cooldown all weapons
    // var player = this.player,
    //     shooting = player.shooting;

    // if (shooting) {
    //   var cooldown = player[shooting],
    //       nextShotInKey = shooting + '_nextShotIn',
    //       nextShotIn = player[nextShotInKey] || 0;

    //   nextShotIn -= dt;

    //   if (nextShotIn <= 0) {
    //     nextShotIn = cooldown;
    //     this.fireBullet(shooting, this.world);
    //   }
    //   player[nextShotInKey] = nextShotIn;
    // }

    this.asteroidGenerator.processTime(dt);

    this.playfield.style.update({
      x: this.style.width / 2,
      y: this.style.height / 2
    });

    if (this.playerShooting) {
      this.player.shoot();
    }

    this.world.Step(dt, 10, 10);
  };

});
