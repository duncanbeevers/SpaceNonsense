import ui.ImageView;
import ui.resource.Image;
import ui.StackView;

import src.views.FillScreenImageView as FillScreenImageView;
import src.views.BulletView as BulletView;
import src.views.PlayerView as PlayerView;

import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(ui.StackView, function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      width: 576,
      height: 1024
    });

    supr(this, "init", [opts]);

    // Pretty background, TODO: Change this, parallax or something
    this.setupBackground();

    // Set up the world of the physics simulation
    this.setupPhysics();

    // Add the player to the scene graph and physics simulation
    this.setupPlayer();
  };









  this.setupPhysics = function() {
    // var contactListener = new FW.NamedContactListener();

    var world = new Box2D.Dynamics.b2World(
      new Box2D.Common.Math.b2Vec2(0, 0), // no gravity
      true // allow sleep
    );

    this.world = world;

    // world.SetContactListener(contactListener);

    // contactListener.registerContactListener(
    //   "bullet001", "asteroid",
    //   function(impact, bulletFixture, asteroidFixture) {
    //   });
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
    player = merge(player, {
      shooting: false,
      r: null,
      bullet001: 1000 // ms cooldown
    });


    playerImageView = new PlayerView(this.world, { superview: this });

    this.on("InputStart", function(event, point) {
      player.shooting = 'bullet001';
    });

    this.on("InputOver", function(event, point) {
      player.shooting = false;
    });

    this.on("InputMove", function(event, point) {
      var pointAt = Math.atan2(point.y - playerImageView.style.y, point.x - playerImageView.style.x);

      player.r = pointAt;
      playerImageView.style.update({ r: pointAt });
    });


  };

  this.fireBullet = function(bulletName, world) {
    new BulletView(bulletName, world, {
      superview: this,
      bullet: bulletName,
      x: playerImageView.style.x,
      y: playerImageView.style.y,
      trajectory: player.r
    });
  };

  this.tick = function(dt) {
    // TODO: Cooldown all weapons
    var shooting = player.shooting;

    if (shooting) {
      var cooldown = player[shooting],
          nextShotInKey = shooting + '_nextShotIn',
          nextShotIn = player[nextShotInKey] || 0;

      nextShotIn -= dt;

      if (nextShotIn <= 0) {
        nextShotIn = cooldown;
        this.fireBullet(shooting, this.world);
      }
      player[nextShotInKey] = nextShotIn;
    }

    this.world.Step(dt, 10, 10)
  };
});
