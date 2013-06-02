import .Pie as Pie;

import ..BaseScenario as BaseScenario;
import src.lib.PhysicsEditorImporter as PhysicsEditorImporter;
import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;

exports = Class(BaseScenario, function(supr) {
  // this.init = function(opts) {
  this.init = function(name, superview) {
    supr(this, "init", arguments);

    var scenarioName = "IceCream";

    var importer = new PhysicsEditorImporter(scenarioName);
    this.importer = importer;

    this.setupPie();
  };

  this.setupPie = function() {
    this.pie = new Pie(this.gameDispatcher, this.world, this.playfield, this.importer, 0, 5);
  };

  this.zoomRadius = function() {
    return 10;
  };
});
