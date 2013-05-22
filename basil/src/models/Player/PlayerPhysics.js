import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_PhysicsMixin as FW.PhysicsMixin;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(function(supr) {
  this.init = function(player, x, y, radius, world) {
    this.setupCirclePhysics(x, y, radius, player, world, {
      density: 5,
      friction: 0.6,
      restitution: 0.1,
      linearDamping: 0.1,
      angularDamping: 1
    });
  };

  FW.GameClosureExtend(this, FW.PhysicsMixin);
});
