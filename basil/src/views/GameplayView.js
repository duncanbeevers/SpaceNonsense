import ui.ImageView;
import ui.resource.Image;
import ui.StackView;

import src.views.FillScreenImageView as FillScreenImageView;

exports = Class(ui.StackView, function(supr) {
  this.init = function(opts) {
    supr(this, "init", [opts]);

    this.setupBackground();
  };

  this.setupBackground = function() {
    var backgroundImageView = new FillScreenImageView({
      image: "resources/images/reference_128x128_thumb.png",
    });
  }
});
