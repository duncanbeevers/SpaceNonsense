import src.models.Asteroid.AsteroidView as AsteroidView;
import src.models.Asteroid.AsteroidPhysics as AsteroidPhysics;

exports = Class(function(supr) {
  this.init = function(dispatcher, x, y, radius, player, world, superview) {
    this.player = player;

    this.asteroidView = new AsteroidView(radius, player, { superview: superview });
    this.asteroidPhysics = new AsteroidPhysics(this, x, y, radius, player, world);

    var asteroid = this;
    this._tick = function() { asteroid.tick(); };
    dispatcher.on("tick", this._tick);
  };

  this.slaveViewToPhysics = function() {
    var asteroidViewStyle = this.asteroidView.style,
        physicsPosition = this.asteroidPhysics.getPosition();

    asteroidViewStyle.x = physicsPosition.x;
    asteroidViewStyle.y = physicsPosition.y;
    asteroidViewStyle.offsetX = -asteroidViewStyle.width / 2;
    asteroidViewStyle.offsetY = -asteroidViewStyle.height / 2;
    asteroidViewStyle.r = physicsPosition.r;
  };

  this.getPosition = function() {
    return this.asteroidPhysics.getPosition();
  };

  this.approachPlayer = function() {
    this.asteroidPhysics.approachPlayer(this.player);
  };

  this.tick = function() {
    this.slaveViewToPhysics();
    this.approachPlayer();
  };
});
