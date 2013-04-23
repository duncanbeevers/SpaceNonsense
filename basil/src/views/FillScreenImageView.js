import device;
import ui.ImageView;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      layout    : "box",
      centerX   : true,
      centerY   : true,
      superview : GC.app.view
    });

    supr(this, "init", [opts]);

    var image       = this.getImage(),
        imageStyle  = this.style,
        imageWidth  = image.getWidth(),
        imageHeight = image.getHeight();

    function rescaleFillScreenImage() {
      var scale = Math.max(device.width / imageWidth, device.height / imageHeight);

      imageStyle.update({
        width  : imageWidth,
        height : imageHeight,
        scale  : scale
      });
    };

    device.screen.subscribe("Resize", rescaleFillScreenImage);

    rescaleFillScreenImage();
  };
});
