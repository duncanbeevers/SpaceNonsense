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
    var player = {
      shooting: false,
      r: null,
      bullet001: 300 // 300ms cooldown
    };

    var playerImageView = new ui.ImageView({
      superview: this,
      autoSize: true,
      layout: "box",
      centerAnchor: true,
      centerX: true,
      centerY: true,
      image: "resources/images/reference_25x25_compass.png"
    });

    this.on("InputStart", function(event, point) {
      player.shooting = true;
    });

    this.on("InputOver", function(event, point) {
      player.shooting = false;
    });

    this.on("InputMove", function(event, point) {
      // playerImageView;
      // this;
      // event;
      // point;
      // debugger;
      var pointAt = Math.atan2(point.y - playerImageView.style.y, point.x - playerImageView.style.x);

      player.r = pointAt;
      playerImageView.style.update({ r: pointAt });
    });
  };
});
