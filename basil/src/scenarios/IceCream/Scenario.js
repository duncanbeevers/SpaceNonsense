import .Pie as Pie;

import src.views.GameplayView as GameplayView;
import src.lib.PhysicsEditorImporter as PhysicsEditorImporter;

exports = Class(GameplayView, function(supr) {
  this.init = function(opts) {
    supr(this, "init", [opts]);

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
