import src.models.Asteroid as Asteroid;

import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(function(supr) {
  this.init = function(superview, player, world) {
    this.superview = superview;
    this.player = player;
    this.world = world;

    // immediately
    this.nextAsteroidIn = 0; // ms
  };

  this.processTime = function(dt) {
    this.nextAsteroidIn -= dt;
    if (this.nextAsteroidIn <= 0) {
      this.nextAsteroidIn = 5000; // ms
      this.spawnAsteroid();
    }
  };

  this.spawnAsteroid = function() {
    var asteroid = new Asteroid(this.player, this.world, this.superview);
  };
});
