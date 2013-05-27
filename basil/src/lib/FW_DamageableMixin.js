var FW = this.FW || (this.FW = {});

var DamagedEventName = "damaged",
    DiedEventName = "died";

// Allows for damageable entities
// Expectations:
//   Object has a `dispatcher` property used to dispatch events from that object

FW.DamageableMixin = {
  init: function() {
    this.life = this.maxLife;
  },

  // Apply damage to this object
  damage: function(damage) {
    this.life = this.life - damage;

    if (this.life - damage <= 0) {
      this.die();
    } else {
      this.dispatcher.trigger(DamagedEventName, damage);
    }
  },

  // Register to receive damage notificaiton from this object
  onDamaged: function(fn) {
    this.dispatcher.on(DamagedEventName, fn, this);
  },

  die: function() {
    this.dispatcher.trigger(DiedEventName);
  },

  // Register to receive death notification from this object
  onDied: function(fn) {
    this.dispatcher.on(DiedEventName, fn, this);
  }
};

exports = FW.DamageableMixin;
