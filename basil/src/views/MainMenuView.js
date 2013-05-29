import menus.views.MenuView;

// TODO: Generate the list of scenarios automatically
import src.scenarios.IceCream.Scenario as IceCreamScenario;
import src.scenarios.Tennis.Scenario as TennisScenario;
var Scenarios = {
  "IceCream": IceCreamScenario,
  "Tennis": TennisScenario
};

exports = Class(menus.views.MenuView, function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      title: "Space Nonsense",
      transition: '',
      items: [
        { item: "Ice Cream", action: bind(this, "beginScenario", "IceCream") },
        { item: "Tennis", action: bind(this, "beginScenario", "Tennis") }
      ]
    });

    supr(this, "init", [opts]);
  };

  this.beginScenario = function(scenarioName) {
    console.log("Beginning " + scenarioName + " scenario");

    // Launch the Scenario
    var scenario = new Scenarios[scenarioName]({
      superview: this.getSuperview()
    });
  };
});
