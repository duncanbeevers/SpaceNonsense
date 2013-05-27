var FW = this.FW || (this.FW = {});

var RemovedEventName = "Removed";

FW.GameClosurePhysicsViewSyncMixin = {
  init: function(dispatcher) {
    dispatcher.on("PhysicsViewSync", function() { this.slaveViewToPhysics(); }, this);
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
