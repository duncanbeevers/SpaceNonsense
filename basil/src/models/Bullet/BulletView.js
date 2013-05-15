import ui.ImageView;

import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_GameClosureCenteredViewMixin as FW.GameClosureCenteredViewMixin;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(bullet, trajectory, world, opts) {
    this.name = bullet.name;
    this.radius = 0.6;
    this.trajectory = trajectory;

    this.world = world;

    opts = merge(opts, {
      image: "resources/images/" + bullet.name + ".png",
      autoSize: true
    });

    supr(this, "init", [opts]);

    this.setupPhysics();

    // Apply initial impulse to get the bullet going in the right direction
    var body = this.fixture.GetBody(),
        position = body.GetPosition(),
        impulseForce = 1, // Math.random() * 5 + 30;
        trajectory = this.trajectory;

    body.ApplyImpulse(
      new Box2D.Common.Math.b2Vec2(Math.cos(trajectory) * impulseForce, Math.sin(trajectory) * impulseForce),
      new Box2D.Common.Math.b2Vec2(position.x, position.y)
    );
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
  };

  this.tick = function(dt) {
    var body = this.fixture.GetBody(),
        position = body.GetPosition();

    this.style.x = position.x;
    this.style.y = position.y;
    this.style.offsetX = -this.radius;
    this.style.offsetY = -this.radius;
  };

  this.die = function() {
    this.removeFromPhysics();
    this.removeFromSuperview();
  };

  FW.GameClosureExtend(this, FW.GameClosureCenteredViewMixin);
});