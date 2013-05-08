from ui.filter import MultiplyFilter;

import src.models.Asteroid.AsteroidView as AsteroidView;

exports = Class(function(supr) {
  this.init = function(player, world, superview) {
    var asteroidView = new AsteroidView(player, world, {
      superview: superview
    });
    this.asteroidView = asteroidView;

    var asteroidFilter = new MultiplyFilter({
      r: 128,
      g: 255,
      b: 128,
      a: 1
    });
    this.asteroidFilter = asteroidFilter;
    asteroidView.addFilter(asteroidFilter);
  };

  this.getPosition = function() {
    return { x: this.asteroidView.style.x, y: this.asteroidView.style.y };
  };
});
