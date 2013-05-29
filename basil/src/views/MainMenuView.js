import menus.views.MenuView;

import src.views.GameplayView as GameplayView;

exports = Class(menus.views.MenuView, function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      title: "Space Nonsense",
      transition: '',
      items: [
        { item: "Ice Cream", action: bind(this, "beginScenario", "Ice Cream") },
        { item: "Tennis", action: bind(this, "beginScenario", "Tennis") }
      ]
    });

    supr(this, "init", [opts]);
  };

  this.beginScenario = function(scenarioName) {
    console.log("Beginning " + scenarioName + " scenario");
    // Planet Scene
    var gameplayView = new GameplayView({
      superview: this.getSuperview()
    });
  };
});
