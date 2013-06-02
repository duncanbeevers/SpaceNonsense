import ui.View;

exports = Class(ui.View, function(supr) {
  this.init = function(gameDispatcher, opts) {
    this.gameDispatcher = gameDispatcher;
    supr(this, "init", [opts]);
  };

  this.tick = function(dt) {
    this.gameDispatcher.tick(dt);
  };
});
