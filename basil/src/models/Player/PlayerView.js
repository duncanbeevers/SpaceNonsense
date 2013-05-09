import ui.ImageView;

import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      layout: "box",
      centerAnchor: true,
      image: "resources/images/reference_25x25_compass.png"
    });

    supr(this, "init", [opts]);
  };
});
