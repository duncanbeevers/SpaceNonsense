import ui.ImageView;

import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_GameClosureCenteredViewMixin as FW.GameClosureCenteredViewMixin;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(bullet, radius, opts) {
    this.radius = radius;

    opts = merge(opts, {
      image: "resources/images/" + bullet.name + ".png"
    });

    supr(this, "init", [opts]);
  };

  FW.GameClosureExtend(this, FW.GameClosureCenteredViewMixin);
});
