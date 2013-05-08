import src.models.Asteroid.Asteroid as Asteroid;

import src.lib.FW_Math as FW.Math;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(function(supr) {
  this.init = function(superview, player, world) {
    this.superview = superview;
    this.player = player;
    this.world = world;

    // immediately
    this.nextAsteroidIn = 0; // ms

    this.asteroids = [];
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
    this.asteroids.push(asteroid);
  };

  this.furthestAsteroidDistance = function() {
    return this.furthestAsteroidAndDistance()['distance'];
  };

  this.furthestAsteroidAndDistance = function() {
    var asteroids = this.asteroids,
        asteroid,
        asteroidPosition,
        playerPosition = this.player.getPosition(),
        playerX = playerPosition.x,
        playerY = playerPosition.y,
        result = { asteroid: null, distance: null },
        distance;

    // Maximize distance, memoize calculation result and element
    for (var i = 0; i < asteroids.length; i++) {
      asteroid = asteroids[i];
      asteroidPosition = asteroid.getPosition();
      distance = FW.Math.distance(asteroidPosition.x, asteroidPosition.y, playerX, playerY);
      if (distance > result['distance']) {
        result['distance'] = distance;
        result['asteroid'] = asteroid;
      }
    }

    return result;
  };
});
