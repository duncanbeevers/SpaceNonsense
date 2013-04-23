import ui.ImageView;
import ui.resource.Image;
import ui.StackView;

import src.views.FillScreenImageView as FillScreenImageView;

exports = Class(ui.StackView, function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      width: 576,
      height: 1024
    });

    supr(this, "init", [opts]);

    this.setupBackground();
    this.setupPlayer();
  };

  this.setupBackground = function() {
    new FillScreenImageView({
      superview: this,
      image: "resources/images/reference_128x128_thumb.png"
    });
  }

  this.setupPlayer = function() {
    new ui.ImageView({
      superview: this,
      autoSize: true,
      layout: "box",
      centerX: true,
      centerY: true,
      image: "resources/images/reference_25x25_compass.png"
    });
  };
});
