import src.models.Asteroid.AsteroidView as AsteroidView;
import src.models.Asteroid.AsteroidPhysics as AsteroidPhysics;

import src.lib.FW_Dispatcher as FW.Dispatcher;
import src.lib.FW_DamageableMixin as FW.DamageableMixin;
import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_GameClosurePhysicsViewSyncMixin as FW.GameClosurePhysicsViewSyncMixin;

exports = Class(function(supr) {
  this.name = "Asteroid";

  this.init = function(gameDispatcher, audioManager, x, y, radius, player, world, superview) {
    this.radius = radius;
    this.player = player;

    this.view = new AsteroidView(radius, player, { superview: superview });
    this.physics = new AsteroidPhysics(this, x, y, radius, player, world);

    this.maxLife = 50;

    // Set up a private dispatcher for asteroid events
    this.dispatcher = new FW.Dispatcher();

    // Register tick function with the application dispatcher
    gameDispatcher.onTick(this.tick, this);
    this.onRemoved(function() { gameDispatcher.offTick(this); });

    // When the asteroid dies, remove it from the simulation
    this.onDied(function () {
      this.remove();
      audioManager.play("AsteroidDestroyed");
    });
  };

  this.approachPlayer = function() {
    this.physics.approachPlayer(this.player);
  };

  this.tick = function() {
    this.approachPlayer();
    this.view.colorToHealthPercent(this.life / this.maxLife);
  };

  FW.GameClosureExtend(this, FW.DamageableMixin);
  FW.GameClosureExtend(this, FW.GameClosurePhysicsViewSyncMixin);
});
