import ui.ImageView;

import src.models.Bullet as Bullet;

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

    this.radius = 2; // meters radius
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
    bodyDef.linearDamping = 0.1;
    this.fixture = this.world.CreateBody(bodyDef).CreateFixture(fixtureDef);
    this.fixture.SetUserData(this);
  };

  this.tick = function(dt) {
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

  this.shoot = function(weapon) {
    var trajectory = this.style.r,
        bulletDistance = this.radius * 1.1;

    // TODO: Recycle Bullet objects
    new Bullet(weapon.image, trajectory, this.world, this.getSuperview(),
      this.style.x + Math.cos(trajectory) * bulletDistance,
      this.style.y + Math.sin(trajectory) * bulletDistance
    );
  };
});
