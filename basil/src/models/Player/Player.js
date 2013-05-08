import src.models.Player.PlayerView as PlayerView;

exports = Class(function(supr) {
  this.name = "Player";

  this.init = function(dispatcher, world, superview) {
    this.weapons = [
      { image: 'bullet001',
        cooldown: 200
      }
    ];
    this.currentWeaponIndex = 0;

    // this.playerPhysics = new PlayerPhysics(world);
    this.dispatcher = dispatcher;
    this.playerView = new PlayerView(world, { superview: superview });
  };

  this.processTime = function(dt) {
    this.cooldownWeapons(dt);
  };

  this.getPosition = function() {
    return { x: this.playerView.style.x, y: this.playerView.style.y };
  };

  this.shoot = function(dt) {
    var weapon = this.weapons[this.currentWeaponIndex];
    if (!weapon.cooldownRemaining) {
      weapon.cooldownRemaining = weapon.cooldown;

      this.playerView.shoot(weapon);
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
    this.playerView.style.r = angle;
  };

});
