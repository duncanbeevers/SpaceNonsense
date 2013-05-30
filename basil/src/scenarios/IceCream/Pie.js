import src.lib.FW_PhysicsMixin as FW.PhysicsMixin;

exports = Class(function(supr) {
  this.init = function(gameDispatcher, world, importer, x, y) {
    this.physics = importer.getPhysics("Pie", world, x, y, this);
  };
});
