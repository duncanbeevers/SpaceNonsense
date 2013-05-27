import src.models.Bullet.BulletView as BulletView;
import src.models.Bullet.BulletPhysics as BulletPhysics;

import src.lib.FW_Dispatcher as FW.Dispatcher;
import src.lib.FW_DamageableMixin as FW.DamageableMixin;
import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_GameClosurePhysicsViewSyncMixin as FW.GameClosurePhysicsViewSyncMixin;

exports = Class(function(supr) {
  this.init = function(gameDispatcher, bulletName, trajectory, world, superview, x, y) {
    this.name = bulletName;
    this.lifespan = 10000;
    this.maxLife = 500;

    // TODO: Look up bullet size?
    var radius = 0.6;
    this.radius = radius;

    this.view = new BulletView(this, radius, { superview: superview });
    this.physics = new BulletPhysics(this, x, y, radius, trajectory, world);

    this.gameDispatcher = gameDispatcher;
    gameDispatcher.on("tick", function(dt) {
      this.countdownLifespan(dt);
    }, this);

    var dispatcher = new FW.Dispatcher();

    this.dispatcher = dispatcher;

    // When the bullet dies, remove it from the simulation
    this.onDied(this.remove);
  };

  this.countdownLifespan = function(dt) {
    this.lifespan -= dt;

    // Remove self when lifespan is up,
    if (this.lifespan <= 0) { this.die(); }
  };

  this.die = function() {
    this.gameDispatcher.offByBindTarget("tick", this);
  };

  FW.GameClosureExtend(this, FW.DamageableMixin);
  FW.GameClosureExtend(this, FW.GameClosurePhysicsViewSyncMixin);
});
