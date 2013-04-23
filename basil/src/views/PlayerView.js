import ui.ImageView;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      autoSize: true,
      layout: "box",
      centerAnchor: true,
      centerX: true,
      centerY: true,
      image: "resources/images/reference_25x25_compass.png"
    });

    supr(this, "init", [opts]);
  };
});
