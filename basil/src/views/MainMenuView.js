import menus.views.MenuView;

// TODO: Generate the list of scenarios automatically
import src.scenarios.IceCream.Scenario as IceCreamScenario;
import src.scenarios.Tennis.Scenario as TennisScenario;
import src.scenarios.Asteroids.Scenario as AsteroidsScenario;
var Scenarios = {
  "IceCream": IceCreamScenario,
  "Tennis": TennisScenario,
  "Asteroids": AsteroidsScenario
};

exports = Class(menus.views.MenuView, function(supr) {
  this.init = function(opts) {
    var items = [], scenarioName;
    for (scenarioName in Scenarios) {
      items.unshift({
        item: scenarioName,
        action: bind(this, "beginScenario", scenarioName)
      });
    }

    opts = merge(opts, {
      title: "Space Nonsense",
      transition: '',
      items: items
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
