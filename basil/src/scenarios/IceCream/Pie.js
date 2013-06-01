import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_PhysicsMixin as FW.PhysicsMixin;
import src.lib.FW_GameClosurePhysicsViewSyncMixin as FW.GameClosurePhysicsViewSyncMixin;

exports = Class(function(supr) {
  this.init = function(gameDispatcher, world, superview, importer, x, y) {
    var name = "Pie";
    this.physics = importer.getPhysics(name, world, x, y, this);
    this.view = importer.getView(name, { superview: superview });
  };

  FW.GameClosureExtend(this, FW.GameClosurePhysicsViewSyncMixin);
});
