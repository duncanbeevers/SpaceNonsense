import ui.ImageView;
from ui.filter import MultiplyFilter;

import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_GameClosureCenteredViewMixin as FW.GameClosureCenteredViewMixin;
import src.lib.FW_Math as FW.Math;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(radius, player, opts) {
    this.radius = radius;

    var asteroids = [ "001", "002", "003" ];

    opts = merge(opts, {
      image: "resources/scenarios/Asteroids/Asteroid" + FW.Math.sample(asteroids) + ".png"
    });

    supr(this, "init", [opts]);

    this.setupFilter();
  };

  this.setupFilter = function() {
    var filter = new MultiplyFilter({
      r: 255,
      g: 255,
      b: 255,
      a: 1
    });
    this.filter = filter;
    this.setFilter(filter);
  };

  this.colorToHealthPercent = function(unfilteredPercent) {
    var percent = FW.Math.clamp(unfilteredPercent, 0, 1);
    this.filter.update({
      r: 255,
      g: 255 * percent,
      b: 255 * percent
    });
  };

  FW.GameClosureExtend(this, FW.GameClosureCenteredViewMixin);
});
