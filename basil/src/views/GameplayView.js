import ui.ImageView;
import ui.StackView;

exports = Class(ui.StackView, function(supr) {
  this.init = function(opts) {
    supr(this, "init", [opts]);

    this.setupBackground();
  };

  this.setupBackground = function() {
    var backgroundImageView = new ui.ImageView({
      superview: this,
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      image: "resources/images/128x128_thumb.png"
    });
  }
});
