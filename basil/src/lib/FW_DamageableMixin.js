var FW = this.FW || (this.FW = {});

var damagedEventName = 'damaged',
    diedEventName = 'died';

// Allows for damageable entities
// Expectations:
//   Object has a `dispatcher` property used to dispatch events from that object
//   Object has a `maxLife` property used to set the initial life of the object

FW.DamageableMixin = {
  init: function() {
    this.life = this.maxLife;
  },

  // Apply damage to this object
  damage: function(damage) {
    this.life = this.life - damage;

    if (this.life - damage <= 0) {
      this.dispatcher.trigger(diedEventName);
    } else {
      this.dispatcher.trigger(damagedEventName, damage);
    }
  },

  // Register to receive damage notificaiton from this object
  onDamaged: function(fn) {
    this.dispatcher.on(damagedEventName, fn, this);
  },

  // Register to receive death notification from this object
  onDied: function(fn) {
    this.dispatcher.on(diedEventName, fn, this);
  }
};

exports = FW.DamageableMixin;
