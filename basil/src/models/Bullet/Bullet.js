import src.models.Bullet.BulletView as BulletView;
import src.models.Bullet.BulletPhysics as BulletPhysics;

import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_GameClosurePhysicsViewSyncMixin as FW.GameClosurePhysicsViewSyncMixin;

exports = Class(function(supr) {
  this.init = function(dispatcher, bulletName, trajectory, world, superview, x, y) {
    this.name = bulletName;
    this.lifespan = 10000;

    // TODO: Look up bullet size?
    var radius = 0.6;
    this.radius = radius;

    this.view = new BulletView(this, radius, { superview: superview });
    this.physics = new BulletPhysics(this, x, y, radius, trajectory, world);

    this.dispatcher = dispatcher;
    dispatcher.on("tick", function(dt) { this.countdownLifespan(dt); }, this);
  };

  this.countdownLifespan = function(dt) {
    this.lifespan -= dt;

    // Remove self when lifespan is up,
    if (this.lifespan <= 0) { this.die(); }
  };

  this.die = function() {
    this.dispatcher.offByBindTarget("tick", this);
  };

  FW.GameClosureExtend(this, FW.GameClosurePhysicsViewSyncMixin);
});
