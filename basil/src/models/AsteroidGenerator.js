import src.models.Asteroid.Asteroid as Asteroid;

import src.lib.FW_Math as FW.Math;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(function(supr) {
  this.init = function(gameDispatcher, audioManager, superview, player, world) {
    this.gameDispatcher = gameDispatcher;
    this.audioManager = audioManager;
    this.superview = superview;
    this.player = player;
    this.world = world;

    // immediately
    this.nextAsteroidIn = 0; // ms

    this.asteroids = [];

    gameDispatcher.onTick(this.countdownToAsteroid, this);

    audioManager.addSound("AsteroidDestroyed");
  };

  this.countdownToAsteroid = function(dt) {
    this.nextAsteroidIn -= dt;
    if (this.nextAsteroidIn <= 0) {
      this.nextAsteroidIn = 100; // ms
      if (this.asteroids.length < 10) {
        this.spawnAsteroid();
      }
    }
  };

  this.spawnAsteroid = function() {
    var player = this.player,
        radius = FW.Math.random(3, 5),
        distanceFromPlayer = FW.Math.random(10, 20) + radius + player.getRadius(),
        approachAngle = FW.Math.random(FW.Math.TWO_PI),
        playerPosition = this.player.getPosition(),
        x = Math.cos(approachAngle) * distanceFromPlayer + playerPosition.x,
        y = Math.sin(approachAngle) * distanceFromPlayer + playerPosition.y;

    var generatedAsteroids = this.asteroids;

    var asteroid = new Asteroid(this.gameDispatcher, this.audioManager, x, y, radius, this.player, this.world, this.superview);
    asteroid.onRemoved(function() {
      var asteroid, i;
      for (i = generatedAsteroids.length - 1; i >= 0; i--) {
        asteroid = generatedAsteroids[i];
        if (asteroid === this) {
          generatedAsteroids.splice(i, 1);
        }
      }
    });
    generatedAsteroids.push(asteroid);
  };

  this.furthestAsteroidDistance = function() {
    return this.furthestAsteroidAndDistance().distance;
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
    for (var i = asteroids.length - 1; i >= 0; i--) {
      asteroid = asteroids[i];
      asteroidPosition = asteroid.getPosition();
      distance = FW.Math.distance(asteroidPosition.x, asteroidPosition.y, playerX, playerY);
      if (distance > result.distance) {
        result.distance = distance;
        result.asteroid = asteroid;
      }
    }

    return result;
  };
});
