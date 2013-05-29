import .Fixtures as Fixtures;

import src.views.GameplayView as GameplayView;

exports = Class(GameplayView, function(supr) {
  this.init = function(opts) {
    supr(this, "init", [opts]);
    console.log("Incredible!, fixtures: %o", Fixtures);
  };
});
