import src.models.Bullet.BulletView as BulletView;

exports = Class(function(supr) {
  this.init = function(dispatcher, bulletName, trajectory, world, superview, x, y) {
    this.name = bulletName;

    var opts = {
      superview: superview,
      x: x,
      y: y
    };
    this.bulletView = new BulletView(this, trajectory, world, opts);

    this.lifespan = 10000;

    this.dispatcher = dispatcher;
    dispatcher.on("tick", function(dt) { this.countdownLifespan(dt); }, this);
  };

  this.countdownLifespan = function(dt) {
    this.lifespan -= dt;

    // Remove self when lifespan is up,
    if (this.lifespan <= 0) {
      this.bulletView.die();
      this.dispatcher.offByBindTarget("tick", this);
    }
  };
});
