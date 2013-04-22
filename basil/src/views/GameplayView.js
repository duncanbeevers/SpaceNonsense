import ui.ImageView;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      x: 0,
      y: 0,
      autoSize: true,
      image: "resources/images/128x128_thumb.png"
    });

    supr(this, "init", [opts]);
  };
});
