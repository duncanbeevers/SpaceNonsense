import ui.ViewPool;
import ui.SpriteView;

exports = Class(function(supr) {
  this.init = function(playfield) {
    this.playfield = playfield;

    this.viewPool = new ui.ViewPool({
      ctor: ui.SpriteView,
      initCount: 10,
      initOpts: {
        url: "resources/images/animations/explosions",
        frameRate: 30,
        autoStart: false,
        loop: false
      }
    });
  };

  this.register = function(contactListener) {
    contactListener.registerImpactListener("bullet001", "Asteroid", this.getListener());
  };

  this.getListener = function() {
    var viewPool = this.viewPool,
        playfield = this.playfield;

    return function(bullet, asteroid, strength, location) {
      var size = strength / 5;

      var explosionView = viewPool.obtainView({
        superview: playfield,
        x: location.x,
        y: location.y,
        width: size,
        height: size,
        offsetX: -size / 2,
        offsetY: -size / 2
      });

      explosionView.startAnimation("explode", { callback: function() {
          viewPool.releaseView(explosionView);
          explosionView.removeFromSuperview();
        }
      });

      asteroid.damage(strength / 5);
    };

  };
});
