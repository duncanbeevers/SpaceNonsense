import src.models.BaseScenario as BaseScenario;

exports = Class(BaseScenario, function(supr) {
  this.init = function(name, superview) {
    supr(this, "init", arguments);

    console.log("Nothing to say, I have no fixtures yet");
  };
});
