import ..BaseScenario as BaseScenario;

exports = Class(BaseScenario, function(supr) {
  this.init = function(superview) {
    supr(this, "init", [superview]);

    console.log("Nothing to say, I have no fixtures yet");
  };
});
