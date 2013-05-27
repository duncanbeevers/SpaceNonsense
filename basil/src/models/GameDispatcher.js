import src.lib.FW_Dispatcher as FW.Dispatcher;

var TickEventName = "tick";

// TODO: Extract from PhysicsViewSyncMixin
var PhysicsViewSyncEventName = "PhysicsViewSync";

// GameDispatcher event-binding calls require a handler object
// since this dispatcher is passed through to most objects
// in the game.
exports = Class(function(supr) {
  this.init = function() {
    this.dispatcher = new FW.Dispatcher();
  };

  this.onTick = function(fn, bindTarget) {
    this.dispatcher.on(TickEventName, fn, bindTarget);
  };

  this.offTick = function(bindTarget) {
    this.dispatcher.offByBindTarget(TickEventName, bindTarget);
  };

  this.onPhysicsViewSync = function(fn, bindTarget) {
    this.dispatcher.on(PhysicsViewSyncEventName, fn, bindTarget);
  };

  this.offPhysicsViewSync = function(bindTarget) {
    this.dispatcher.offByBindTarget(PhysicsViewSyncEventName, bindTarget);
  };

  this.tick = function(dt) {
    this.dispatcher.trigger(TickEventName, dt);
    this.dispatcher.trigger(PhysicsViewSyncEventName);
  };
});
