import ui.ViewPool;
import ui.SpriteView;

import src.lib.FW_Math as FW.Math;

exports = Class(function(supr) {
  this.init = function() {
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

  this.register = function(superview, contactListener, audioManager) {
    audioManager.addSound("BulletAsteroidHit", { volume: 0.8 });

    contactListener.registerImpactListener("Bullet001", "Asteroid", this.getListener(superview, audioManager));
  };

  this.getListener = function(superview, audioManager) {
    var viewPool = this.viewPool;

    var listener = function(bullet, asteroid, strength, location) {
      var size = strength / 5;

      var explosionView = viewPool.obtainView({
        superview: superview,
        x: location.x,
        y: location.y,
        r: FW.Math.random(FW.Math.TWO_PI),
        width: size,
        height: size,
        offsetX: -size / 2,
        offsetY: -size / 2,
        centerX: size / 2,
        centerY: size / 2
      });

      explosionView.startAnimation("spark", { callback: function() {
          viewPool.releaseView(explosionView);
          explosionView.removeFromSuperview();
        }
      });

      var soundName = "BulletAsteroidHit",
          soundVolume = FW.Math.clamp(strength / 50, 0.2, 1);
      audioManager.setVolume(soundName, soundVolume);
      audioManager.play(soundName);

      // Apply the damage to the Asteroid
      asteroid.damage(strength);

      // Deduct the damage from bullet
      bullet.damage(strength);
    };

    return delayOnCall(listener);
  };
});

var delayOnCall = function(fn) {
  return function() {
    // Preserve arguments
    var args = arguments;
    setTimeout(function() {
      fn.apply(this, args);
    });
  };
};
