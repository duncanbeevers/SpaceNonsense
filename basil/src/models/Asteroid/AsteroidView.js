import ui.ImageView;
from ui.filter import MultiplyFilter;

import src.lib.FW_Math as FW.Math;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(player, opts) {
    opts = merge(opts, {
      image: "resources/images/asteroid001.png",
      layout: "box",
      centerAnchor: true
    });

    supr(this, "init", [opts]);
    this.setupFilter();
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
