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
      image: "resources/images/bg001.png"
    });
  }

  this.setupPlayer = function() {
    var playerImageView = new ui.ImageView({
      superview: this,
      autoSize: true,
      layout: "box",
      centerAnchor: true,
      centerX: true,
      centerY: true,
      image: "resources/images/reference_25x25_compass.png"
    });

    // this.on("InputStart", function(event, point) {

    // });

    this.on("InputMove", function(event, point) {
      // playerImageView;
      // this;
      // event;
      // point;
      // debugger;
      var pointAt = Math.atan2(point.y - playerImageView.style.y, point.x - playerImageView.style.x);
      playerImageView.style.update({
        r: pointAt
      });
    });
  };
});
