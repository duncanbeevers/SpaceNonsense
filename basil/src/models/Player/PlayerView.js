import ui.ImageView;

import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_GameClosureCenteredViewMixin as FW.GameClosureCenteredViewMixin;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(radius, opts) {
    this.radius = radius;

    opts = merge(opts, {
      image: "resources/images/reference_25x25_compass.png",
      autoSize: true
    });

    supr(this, "init", [opts]);
  };

  FW.GameClosureExtend(this, FW.GameClosureCenteredViewMixin);
});
