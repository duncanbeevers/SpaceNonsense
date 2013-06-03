import src.models.BasePlayer as BasePlayer;
import src.models.Bullet.Bullet as Bullet;

exports = Class(BasePlayer, function(supr) {
  this.init = function(gameDispatcher, world, superview) {
    supr(this, "init", arguments);

    gameDispatcher.onTick(this.cooldownWeapons, this);

    this.weapons = [
      { image: "Bullet001",
        cooldown: 200
      }
    ];
    this.currentWeaponIndex = 0;
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


  this.shoot = function(dt) {
    var weapon = this.weapons[this.currentWeaponIndex];
    if (!weapon.cooldownRemaining) {
      weapon.cooldownRemaining = weapon.cooldown;

      var playerPosition = this.getPosition(),
          trajectory = playerPosition.r,
          bulletSize = this.getRadius() / 5,
          bulletDistance = this.getRadius() + bulletSize;

      // TODO: Recycle Bullet objects
      new Bullet(this.gameDispatcher, bulletSize, weapon.image, trajectory, this.physics.getWorld(), this.view.getSuperview(),
        playerPosition.x + Math.cos(trajectory) * bulletDistance,
        playerPosition.y + Math.sin(trajectory) * bulletDistance
      );

    }
  };

});
