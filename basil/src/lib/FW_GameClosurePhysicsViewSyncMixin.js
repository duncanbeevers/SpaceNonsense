var FW = this.FW || (this.FW = {});

exports = {
  tick: function() {
    this.slaveViewToPhysics();
  },
  slaveViewToPhysics: function() {
    var viewStyle = this.view.style,
        position = this.getPosition();

    viewStyle.x = position.x;
    viewStyle.y = position.y;
    viewStyle.r = position.r;
  },
  getPosition: function() {
    return this.physics.getPosition();
  }
};
