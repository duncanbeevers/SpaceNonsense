import ui.ImageView;
from ui.filter import MultiplyFilter;

import src.lib.FW_GameClosureCenteredViewMixin as FW.GameClosureCenteredViewMixin;
import src.lib.FW_Math as FW.Math;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(radius, player, opts) {
    opts = merge(opts, {
      image: "resources/images/asteroid001.png"
    });

    supr(this, "init", [opts]);

    this.setupFilter();
    this.scaleToRadius(radius);
    this.centerAnchorToImage();
  };

  this.setupFilter = function() {
    var asteroidFilter = new MultiplyFilter({
      r: 128,
      g: 255,
      b: 128,
      a: 1
    });
    this.asteroidFilter = asteroidFilter;
    this.addFilter(asteroidFilter);
  };
});

merge(exports.prototype, FW.GameClosureCenteredViewMixin);