var FW = this.FW || (this.FW = {});

exports = {
  tick: function() {
    this.slaveViewToPhysics();
  },
  slaveViewToPhysics: function() {
    var viewStyle = this.view.style,
        physicsPosition = this.physics.getPosition();

    viewStyle.x = physicsPosition.x;
    viewStyle.y = physicsPosition.y;
    viewStyle.r = physicsPosition.r;
  }
};
