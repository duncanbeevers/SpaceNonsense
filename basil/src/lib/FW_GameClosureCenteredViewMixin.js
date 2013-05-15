var FW = this.FW || (this.FW = {});

exports = {
  init: function() {
    this.scaleAndCenter();
  },
  scaleAndCenter: function() {
    var imageBounds = this.getImage().getBounds(),
        radius = this.getRadius();
    this.style.width = radius * 2;
    this.style.height = this.style.width;
    this.style.offsetX = -radius;
    this.style.offsetY = -radius;
    this.style.anchorX = this.style.width / 2;
    this.style.anchorY = this.style.height / 2;
  },
  getRadius: function() {
    return this.radius;
  }
};
