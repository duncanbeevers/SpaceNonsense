import device;
import ui.ImageView;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      layout  : "box",
      centerX : true,
      centerY : true
    });

    supr(this, "init", [opts]);

    var image       = this.getImage(),
        imageStyle  = this.style,
        imageWidth  = image.getWidth(),
        imageHeight = image.getHeight(),
        superview   = this.getSuperview();

    function rescaleFillScreenImage() {
      var superviewStyle  = superview.style,
          superviewWidth  = superview.style.width,
          superviewHeight = superview.style.height,
          scale           = Math.max(superviewWidth / imageWidth, superviewHeight / imageHeight);

      imageStyle.update({
        width  : imageWidth,
        height : imageHeight,
        scale  : scale
      });
    };

    device.screen.subscribe("Resize", rescaleFillScreenImage);

    setTimeout(rescaleFillScreenImage);
  };
});
