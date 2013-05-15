import src.models.Player.PlayerView as PlayerView;
import src.models.Player.PlayerPhysics as PlayerPhysics;
import src.models.Bullet.Bullet as Bullet;

import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_GameClosurePhysicsViewSyncMixin as FW.GameClosurePhysicsViewSyncMixin;

exports = Class(function(supr) {
  this.name = "Player";

  this.init = function(dispatcher, world, superview) {
    this.radius = 12;

    this.weapons = [
      { image: 'bullet001',
        cooldown: 200
      }
    ];
    this.currentWeaponIndex = 0;

    this.dispatcher = dispatcher;
    this.view = new PlayerView(this, { superview: superview });
    this.physics = new PlayerPhysics(this, 0, 0, this.radius, world);

    dispatcher.on("tick", function(dt) { this.cooldownWeapons(dt); }, this);
  };

  this.shoot = function(dt) {
    var weapon = this.weapons[this.currentWeaponIndex];
    if (!weapon.cooldownRemaining) {
      weapon.cooldownRemaining = weapon.cooldown;

      var playerViewStyle = this.view.style,
          trajectory = playerViewStyle.r,
          bulletDistance = this.radius * 1.1;

      // TODO: Recycle Bullet objects
      new Bullet(this.dispatcher, weapon.image, trajectory, this.physics.world, this.view.getSuperview(),
        playerViewStyle.x + Math.cos(trajectory) * bulletDistance,
        playerViewStyle.y + Math.sin(trajectory) * bulletDistance
      );

    }
  };

  this.cooldownWeapons = function(dt) {
    var weapon;
    for (var i = this.weapons.length - 1; i >= 0; i--) {
      weapon = this.weapons[i];
      if (weapon.cooldownRemaining) {
        weapon.cooldownRemaining -= Math.min(weapon.cooldownRemaining, dt);
      }
    }
  };

  this.pointAt = function(angle) {
    this.view.style.r = angle;
  };

  this.getPosition = function() {
    var position = this.physics.getPosition();
    position.r = this.view.style.r;
    return position;
  };

  this.getRadius = function() {
    return this.radius;
  };

  FW.GameClosureExtend(this, FW.GameClosurePhysicsViewSyncMixin);
});
