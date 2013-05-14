import src.models.Player.PlayerView as PlayerView;
import src.models.Player.PlayerPhysics as PlayerPhysics;
import src.models.Bullet as Bullet;

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

    // this.playerPhysics = new PlayerPhysics(world);
    this.dispatcher = dispatcher;
    this.playerView = new PlayerView(this.radius, { superview: superview });
    this.playerPhysics = new PlayerPhysics(this, 0, 0, this.radius, world);

    dispatcher.on("tick", function() { this.tick(); }, this);
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

      // this.playerView.shoot(weapon);

      var playerViewStyle = this.playerView.style,
          trajectory = playerViewStyle.r,
          bulletDistance = this.radius * 1.1;

      // TODO: Recycle Bullet objects
      new Bullet(weapon.image, trajectory, this.playerPhysics.world, this.playerView.getSuperview(),
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
    this.playerView.style.r = angle;
  };

  this.slaveViewToPhysics = function() {
    var viewStyle = this.playerView.style,
        physicsPosition = this.playerPhysics.getPosition();

    viewStyle.x = physicsPosition.x;
    viewStyle.y = physicsPosition.y;
    viewStyle.width = this.radius * 2;
    viewStyle.height = this.radius * 2;
    viewStyle.offsetX = -this.radius;
    viewStyle.offsetY = -this.radius;
  };

  this.tick = function() {
    this.slaveViewToPhysics();
  };

});
