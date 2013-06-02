import ..BaseScenario as BaseScenario;
import src.models.AsteroidGenerator as AsteroidGenerator;

import src.interactions.BulletImpactsAsteroid as BulletImpactsAsteroid;
import src.interactions.BulletImpactsBullet as BulletImpactsBullet;

exports = Class(BaseScenario, function(supr) {
  this.init = function(name, superview) {
    supr(this, "init", arguments);

    // Make the Asteroid Generator
    this.setupAsteroidGenerator();

    this.setupInteractions();
  };

  this.setupAsteroidGenerator = function() {
    var asteroidGenerator = new AsteroidGenerator(this.gameDispatcher, this.audioManager, this.playfield, this.player, this.world);
    this.asteroidGenerator = asteroidGenerator;
  };

  this.setupInteractions = function() {
    // Encapsulate collision interaction in its own class
    var bulletImpactsAsteroid = new BulletImpactsAsteroid();
    bulletImpactsAsteroid.register(this.playfield, this.contactListener, this.audioManager);
    var bulletImpactsBullet = new BulletImpactsBullet();
    bulletImpactsBullet.register(this.playfield, this.contactListener, this.audioManager);
  };

  this.zoomRadius = function() {
    return this.asteroidGenerator.furthestAsteroidDistance();
  };
});
