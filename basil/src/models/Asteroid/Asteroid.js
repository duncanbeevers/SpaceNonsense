import src.models.Asteroid.AsteroidView as AsteroidView;
import src.models.Asteroid.AsteroidPhysics as AsteroidPhysics;

import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_GameClosurePhysicsViewSyncMixin as FW.GameClosurePhysicsViewSyncMixin;

exports = Class(function(supr) {
  this.name = "Asteroid";

  this.init = function(dispatcher, x, y, radius, player, world, superview) {
    this.player = player;

    this.view = new AsteroidView(radius, player, { superview: superview });
    this.physics = new AsteroidPhysics(this, x, y, radius, player, world);

    dispatcher.on("tick", function() { this.tick(); }, this);
  };

  this.approachPlayer = function() {
    this.physics.approachPlayer(this.player);
  };

  this.tick = function() {
    this.approachPlayer();
  };

  FW.GameClosureExtend(this, FW.GameClosurePhysicsViewSyncMixin);
});
