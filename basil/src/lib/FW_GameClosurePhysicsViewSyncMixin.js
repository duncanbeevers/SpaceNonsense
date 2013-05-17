var FW = this.FW || (this.FW = {});

exports = {
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
  die: function() {
    this.view.removeFromSuperview();
    this.physics.removeFromPhysics();
  }
};
