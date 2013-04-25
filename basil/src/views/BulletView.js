import ui.ImageView;

import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(bulletName, trajectory, world, opts) {
    opts = merge(opts, {
      image: "resources/images/" + bulletName + ".png",
      centerAnchor: true,
      layout: "box"
    });

    supr(this, "init", [opts]);

    this.name = bulletName;
    this.radius = 0.3;
    this.lifespan = 10000;
    this.trajectory = trajectory;

    this.world = world;
    this.setupPhysics();
  };

  this.setupPhysics = function() {
    var world = this.world;

    var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
    fixtureDef.density = 0.1;
    fixtureDef.friction = 0.2;
    fixtureDef.restitution = 1;

    fixtureDef.shape = new Box2D.Collision.Shapes.b2CircleShape(this.radius);
    var bodyDef = new Box2D.Dynamics.b2BodyDef();
    bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    bodyDef.position.x = this.style.x;
    bodyDef.position.y = this.style.y;
    bodyDef.bullet = true;
    this.fixture = world.CreateBody(bodyDef).CreateFixture(fixtureDef);
    this.fixture.SetUserData(this);
  };

  this.removeFromPhysics = function() {
    var body = this.fixture.GetBody();
    body.GetWorld().DestroyBody(body);
  }

  this.tick = function(dt) {
    var body = this.fixture.GetBody(),
        position = body.GetPosition();


    // Apply initial impulse to get the bullet going in the right direction
    var impulseForce = 1, // Math.random() * 5 + 30;
        trajectory = this.trajectory;
    body.ClearForces();
    body.ApplyForce(
      new Box2D.Common.Math.b2Vec2(Math.cos(trajectory) * impulseForce, Math.sin(trajectory) * impulseForce),
      new Box2D.Common.Math.b2Vec2(position.x, position.y)
    );

    this.style.x = position.x;
    this.style.y = position.y;
    this.style.width = this.radius * 2;
    this.style.height = this.radius * 2;
    this.style.offsetX = -this.radius;
    this.style.offsetY = -this.radius;

    this.lifespan -= dt;

    // Remove self when lifespan is up,
    // tick should no longer be fired and object is
    // eligible for garbage collection
    if (this.lifespan <= 0) {
      this.removeFromPhysics();
      this.removeFromSuperview();
    }
  };
});
