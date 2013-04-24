import ui.ImageView;

import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(bulletName, world, opts) {
    opts = merge(opts, {
      image: "resources/images/" + bulletName + ".png",
      autoSize: true
    });

    supr(this, "init", [opts]);


    // this.trajectory = opts.trajectory;
    var trajectory = opts.trajectory;

    this.lifespan = 10000;

    this.world = world;
    this.setupPhysics();

    // Apply initial impulse to get the bullet going in the right direction
    var impulseForce = Math.random() * 5 + 2;
    this.fixture.GetBody().ApplyImpulse(
      new Box2D.Common.Math.b2Vec2(Math.cos(trajectory) * impulseForce, Math.sin(trajectory) * impulseForce),
      new Box2D.Common.Math.b2Vec2(0, 0)
    );
  };

  this.setupPhysics = function() {
    var world = this.world;

    var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
    fixtureDef.density = 1;
    fixtureDef.friction = 0.6;
    fixtureDef.restitution = 0.1;

    // TODO: Make the shape match the graphic size?
    fixtureDef.shape = new Box2D.Collision.Shapes.b2CircleShape(4);
    var bodyDef = new Box2D.Dynamics.b2BodyDef();
    bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    bodyDef.position.x = this.style.x;
    bodyDef.position.y = this.style.y;
    this.fixture = world.CreateBody(bodyDef).CreateFixture(fixtureDef);
  };

  this.removeFromPhysics = function() {
    var body = this.fixture.GetBody();
    body.GetWorld().DestroyBody(body);
    // TODO: Remove dead physics bodies from simulation
  }

  this.tick = function(dt) {
    var body = this.fixture.GetBody(),
        position = body.GetPosition();

    this.style.x = position.x;
    this.style.y = position.y;

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
