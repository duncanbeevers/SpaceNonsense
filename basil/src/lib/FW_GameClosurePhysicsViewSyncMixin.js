var FW = this.FW || (this.FW = {});

var RemovedEventName = "Removed";
var PhysicsViewSyncEventName = "PhysicsViewSync";

FW.GameClosurePhysicsViewSyncMixin = {
  init: function(gameDispatcher) {
    gameDispatcher.onPhysicsViewSync(this.slaveViewToPhysics, this);
  },
  slaveViewToPhysics: function() {
    var viewStyle = this.view.style,
        position = this.getPosition();

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
