import ui.ViewPool;
import ui.SpriteView;

import src.lib.FW_Math as FW.Math;

exports = Class(function(supr) {
  this.register = function(superview, contactListener, audioManager) {
    // audioManager.addSound("BulletAsteroidHit", { volume: 0.8 });
    contactListener.registerImpactListener("bullet001", "bullet001", this.getListener(superview, audioManager));
  };

  this.getListener = function(superview, audioManager) {
    return function(bullet1, bullet2, strength, location) {
      // Deduct the damage from both bullets
      bullet1.damage(strength);
      bullet2.damage(strength);
    };

  };
});
