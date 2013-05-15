import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_GameClosurePhysicsMixin as FW.GameClosurePhysicsMixin;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;

var vec1 = new Box2D.Common.Math.b2Vec2(0, 0),
    vec2 = new Box2D.Common.Math.b2Vec2(0, 0);

exports = Class(function(supr) {
  this.init = function(bullet, x, y, radius, trajectory, world) {
    this.setupCirclePhysics(x, y, radius, bullet, world, {
      density: 5,
      friction: 0.6,
      restitution: 0.1
    });
    this.applyOutwardImpulse(trajectory);
  };

  this.applyOutwardImpulse = function(trajectory) {
    // Apply initial impulse to get the bullet going in the right direction
    var body = this.fixture.GetBody(),
        position = body.GetPosition(),
        impulseForce = 100; // Math.random() * 5 + 30;

    vec1.Set(Math.cos(trajectory) * impulseForce, Math.sin(trajectory) * impulseForce);
    vec2.Set(position.x, position.y);
    body.ApplyImpulse(vec1, vec2);
  };

  FW.GameClosureExtend(this, FW.GameClosurePhysicsMixin);
});
