import .Pie as Pie;

import src.models.BaseScenario as BaseScenario;
import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;

exports = Class(BaseScenario, function(supr) {
  // this.init = function(opts) {
  this.init = function(name, superview) {
    supr(this, "init", arguments);

    this.setupPie();
  };

  this.setupPie = function() {
    this.pie = new Pie(this.gameDispatcher, this.world, this.playfield, this.importer, 0, 5);
  };

  this.zoomRadius = function() {
    return 10;
  };
});
