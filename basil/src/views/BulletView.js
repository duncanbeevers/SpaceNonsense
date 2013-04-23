import ui.ImageView;

import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(bulletName, world, opts) {
    opts = merge(opts, {
      image: "resources/images/" + bulletName + ".png",
      autoSize: true,
      layout: "box",
      centerX: true,
      centerY: true
    });

    // this.trajectory = opts.trajectory;
    var trajectory = opts.trajectory;
    this.dx = Math.cos(trajectory) * 0.4;
    this.dy = Math.sin(trajectory) * 0.4;

    this.lifespan = 10000;

    supr(this, "init", [opts]);


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

    var impulseForce = 1;
    this.fixture.GetBody().ApplyImpulse(
      new Box2D.Common.Math.b2Vec2(Math.cos(trajectory) * impulseForce, Math.sin(trajectory) * impulseForce),
      new Box2D.Common.Math.b2Vec2(0, 0)
    );
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

    console.log("position: %o %o", position.x, position.y);
    // this.style.x += this.dx * dt;
    // this.style.y += this.dy * dt;
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
