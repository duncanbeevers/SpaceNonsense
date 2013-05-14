var FW = this.FW || (this.FW = {});

exports = {
  scaleToRadius: function(radius) {
    var imageBounds = this.getImage().getBounds();
    this.style.scale = radius / imageBounds.width;
  },
  centerAnchorToImage: function() {
    var imageBounds = this.getImage().getBounds();
    this.style.anchorX = imageBounds.width / 2;
    this.style.anchorY = imageBounds.height / 2;
  }
};
