import src.views.BulletView as BulletView;

exports = Class(function(supr) {
  this.init = function(bulletName, trajectory, world, superview, x, y) {
    var opts = {
      superview: superview,
      x: x,
      y: y
    };
    this.bulletView = new BulletView(bulletName, trajectory, world, opts);
  };
});
