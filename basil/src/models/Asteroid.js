import src.views.AsteroidView as AsteroidView;

exports = Class(function(supr) {
  this.init = function(player, world, superview) {
    this.asteroidView = new AsteroidView(player, world, {
      superview: superview
    });
  };
});
