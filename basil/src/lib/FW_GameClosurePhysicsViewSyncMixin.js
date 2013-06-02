import src.lib.FW_Math as FW.Math;

var RemovedEventName = "Removed";
var PhysicsViewSyncEventName = "PhysicsViewSync";

FW.GameClosurePhysicsViewSyncMixin = {
  init: function(gameDispatcher) {
    gameDispatcher.onPhysicsViewSync(this.slaveViewToPhysics, this);
  },
  slaveViewToPhysics: function() {
    var viewStyle = this.view.style,
        position = this.getPosition();

    position.x = FW.Math.snap(position.x, 0.5);
    position.y = FW.Math.snap(position.y, 0.5);
    position.r = FW.Math.snap(position.r, Math.PI / 32);

    viewStyle.update(position);
  },
  getPosition: function() {
    return this.physics.getPosition();
  },
  remove: function() {
    this.view.removeFromSuperview();
    this.physics.removeFromPhysics();
    this.dispatcher.trigger(RemovedEventName, this);
  },
  onRemoved: function(fn) {
    this.dispatcher.on(RemovedEventName, fn, this);
  }
};

exports = FW.GameClosurePhysicsViewSyncMixin;
