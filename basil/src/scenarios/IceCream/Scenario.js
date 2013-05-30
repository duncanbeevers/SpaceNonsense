import .Pie as Pie;

import src.views.GameplayView as GameplayView;
import src.lib.PhysicsEditorImporter as PhysicsEditorImporter;

exports = Class(GameplayView, function(supr) {
  this.init = function(opts) {
    supr(this, "init", [opts]);

    var importer = new PhysicsEditorImporter(JSON.parse(CACHE["resources/physics/IceCream.json"]));
    this.importer = importer;

    this.setupPie();
  };

  this.setupPie = function() {
    this.pie = new Pie(this.gameDispatcher, this.world, this.importer, 10, 10);
  };
});
