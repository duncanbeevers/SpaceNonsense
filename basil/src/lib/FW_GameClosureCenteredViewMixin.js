var FW = this.FW || (this.FW = {});

exports = {
  init: function() {
    this.scaleToRadius();
    this.centerAnchorToImage();
  },
  scaleToRadius: function() {
    var imageBounds = this.getImage().getBounds();
    this.style.scale = this.getRadius() / imageBounds.width;
  },
  centerAnchorToImage: function() {
    var imageBounds = this.getImage().getBounds();
    this.style.anchorX = imageBounds.width / 2;
    this.style.anchorY = imageBounds.height / 2;
  },
  getRadius: function() {
    return this.radius;
  }
};
