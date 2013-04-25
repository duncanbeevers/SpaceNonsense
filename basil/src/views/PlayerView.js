import ui.ImageView;

import src.views.BulletView as BulletView;

import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(world, opts) {
    opts = merge(opts, {
      layout: "box",
      centerAnchor: true,
      image: "resources/images/reference_25x25_compass.png"
    });

    supr(this, "init", [opts]);

    this.name = "Player";

    this.radius = 3; // meters radius
    this.weapons = [
      { image: 'bullet001',
        cooldown: 200
      }
    ];
    this.currentWeaponIndex = 0;

    this.world = world;
    this.setupPhysics();
  };

  this.setupPhysics = function() {
    var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
    fixtureDef.density = 50;
    fixtureDef.friction = 0.6;
    fixtureDef.restitution = 0.1;

    fixtureDef.shape = new Box2D.Collision.Shapes.b2CircleShape(this.radius);
    var bodyDef = new Box2D.Dynamics.b2BodyDef();
    bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    bodyDef.position.x = this.style.x;
    bodyDef.position.y = this.style.y;
    this.fixture = this.world.CreateBody(bodyDef).CreateFixture(fixtureDef);
    this.fixture.SetUserData(this);
  };

  this.cooldownWeapons = function(dt) {
    var weapon;
    for (var i = this.weapons.length - 1; i >= 0; i--) {
      weapon = this.weapons[i];
      if (weapon.cooldownRemaining) {
        weapon.cooldownRemaining -= Math.min(weapon.cooldownRemaining, dt);
      }
    }
  };

  this.tick = function(dt) {
    this.cooldownWeapons(dt);

    var body = this.fixture.GetBody(),
        position = body.GetPosition();

    // TODO: Position based on physics sim?
    this.style.x = position.x;
    this.style.y = position.y;
    this.style.width = this.radius * 2;
    this.style.height = this.radius * 2;
    this.style.offsetX = -this.radius;
    this.style.offsetY = -this.radius;
  };


  this.shoot = function() {
    var weapon = this.weapons[this.currentWeaponIndex];
    if (!weapon.cooldownRemaining) {
      weapon.cooldownRemaining = weapon.cooldown;

      var trajectory = this.style.r,
          bulletDistance = this.radius * 1.1;

      new BulletView(weapon.image, trajectory, this.world, {
        superview: this.getSuperview(),
        x: this.style.x + Math.cos(trajectory) * bulletDistance,
        y: this.style.y + Math.sin(trajectory) * bulletDistance
      });
    }
  };
});
