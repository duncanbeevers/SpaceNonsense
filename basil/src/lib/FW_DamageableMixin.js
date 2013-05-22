var FW = this.FW || (this.FW = {});

var damagedEventName = 'damaged',
    diedEventName = 'died';

FW.DamageableMixin = {
  init: function() {
    this.life = this.maxLife;
  },

  // Apply damage to this object
  damage: function(damage) {
    this.life = this.life - damage;

    if (this.life - damage <= 0) {
      this.dispatcher.trigger(damagedEventName, damage);
    } else {
      this.dispatcher.trigger(diedEventName);
    }
  },

  // Register to receive damage notificaiton from this object
  onDamaged: function(fn) {
    this.dispatcher.on(damagedEventName, fn);
  },

  // Register to receive death notification from this object
  onDied: function(fn) {
    this.dispatcher.on(diedEventName, fn);
  }
};

exports = FW.DamageableMixin;
