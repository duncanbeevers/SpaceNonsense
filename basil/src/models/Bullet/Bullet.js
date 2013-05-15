import src.views.BulletView as BulletView;

exports = Class(function(supr) {
  this.init = function(bulletName, trajectory, world, superview, x, y) {
    this.name = bulletName;

    var opts = {
      superview: superview,
      x: x,
      y: y
    };
    this.bulletView = new BulletView(this, trajectory, world, opts);

    this.lifespan = 10000;
  };

  this.processTime = function(dt) {
    this.lifespan -= dt;

    // Remove self when lifespan is up,
    if (this.lifespan <= 0) {
      this.bulletView.die();
    }
  };
});
