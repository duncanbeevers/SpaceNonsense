import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_PhysicsMixin as FW.PhysicsMixin;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;

var vec1 = new Box2D.Common.Math.b2Vec2(0, 0),
    vec2 = new Box2D.Common.Math.b2Vec2(0, 0);

exports = Class(function(supr) {
  this.init = function(bullet, x, y, radius, trajectory, world) {
    // var density = 1 / (radius * radius * 4);
    var density = 1 / radius;
    this.setupCirclePhysics(x, y, radius, bullet, world, {
      density: density,
      friction: 0.6,
      restitution: 0.1
    });
    var mass = this.fixture.GetBody().GetMass();
    var impulseStrength = mass * mass * mass;
    this.applyOutwardImpulse(trajectory, impulseStrength);
  };

  this.applyOutwardImpulse = function(trajectory, impulseStrength) {
    // Apply initial impulse to get the bullet going in the right direction
    var body = this.fixture.GetBody(),
        position = body.GetPosition();

    vec1.Set(Math.cos(trajectory) * impulseStrength, Math.sin(trajectory) * impulseStrength);
    vec2.Set(position.x, position.y);
    body.ApplyImpulse(vec1, vec2);
  };

  FW.GameClosureExtend(this, FW.PhysicsMixin);
});
