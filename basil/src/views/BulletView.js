import ui.ImageView;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(bulletName, opts) {
    opts = merge(opts, {
      image: "resources/images/" + bulletName + ".png",
      autoSize: true,
      layout: "box",
      centerX: true,
      centerY: true
    });

    // this.trajectory = opts.trajectory;
    var trajectory = opts.trajectory;
    this.dx = Math.cos(trajectory) * 0.4;
    this.dy = Math.sin(trajectory) * 0.4;

    this.lifespan = 10000;

    supr(this, "init", [opts]);
  };

  this.tick = function(dt) {
    this.style.x += this.dx * dt;
    this.style.y += this.dy * dt;
    this.lifespan -= dt;

    // Remove self when lifespan is up,
    // tick should no longer be fired and object is
    // eligible for garbage collection
    if (this.lifespan <= 0) {
      this.removeFromSuperview();
    }
  };
});
