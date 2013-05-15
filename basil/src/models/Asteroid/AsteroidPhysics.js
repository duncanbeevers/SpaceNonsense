import src.lib.FW_Math as FW.Math;
import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_GameClosurePhysicsMixin as FW.GameClosurePhysicsMixin;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;

var vec1 = new Box2D.Common.Math.b2Vec2(0, 0),
    vec2 = new Box2D.Common.Math.b2Vec2(0, 0);

exports = Class(function(supr) {
  this.init = function(asteroid, x, y, radius, player, world) {
    this.asteroid = asteroid;
    this.setupCirclePhysics(x, y, radius, player, world);
    this.applyOrbitalImpulse(player);
  };

  this.applyOrbitalImpulse = function(player) {
    // Apply initial impulse to get the asteroid moving
    var body = this.fixture.GetBody(),
        position = body.GetPosition(),
        playerPosition = player.getPosition(),
        trajectory = Math.atan2(position.x - playerPosition.x, position.y - playerPosition.y),
        impulseForce = 1000; // Math.random() * 5 + 30;

    vec1.Set(Math.cos(trajectory) * impulseForce, Math.sin(trajectory) * impulseForce);
    vec2.Set(position.x, position.y);
    body.ApplyImpulse(vec1, vec2);
  };

  this.approachPlayer = function(player) {
    var body = this.fixture.GetBody(),
        position = body.GetPosition(),
        playerPosition = player.getPosition(),
        playerDistance = FW.Math.distance(playerPosition.x, playerPosition.y, position.x, position.y),
        impulseForce = 100 / Math.min(1, Math.sqrt(playerDistance)),
        trajectory = Math.atan2(playerPosition.y - position.y, playerPosition.x - position.x);

    body.ClearForces();
    vec1.Set(Math.cos(trajectory) * impulseForce, Math.sin(trajectory) * impulseForce);
    vec2.Set(position.x, position.y);
    body.ApplyForce(vec1, vec2);
  };

  FW.GameClosureExtend(this, FW.GameClosurePhysicsMixin);
});
