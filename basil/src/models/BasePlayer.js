import src.models.Player.PlayerView as PlayerView;
import src.models.Player.PlayerPhysics as PlayerPhysics;

import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_GameClosurePhysicsViewSyncMixin as FW.GameClosurePhysicsViewSyncMixin;

exports = Class(function(supr) {
  this.name = "Player";

  this.init = function(gameDispatcher, world, superview) {
    this.radius = 1;

    this.gameDispatcher = gameDispatcher;
    this.view = new PlayerView(this, { superview: superview });
    this.physics = new PlayerPhysics(this, 0, -3, this.getRadius(), world);
  };

  this.shoot = function(dt) {
  };

  this.reward = function(size) {
    this.radius += size;
    this.physics.setRadius(this.radius);
    this.view.scaleAndCenter();
  };

  this.pointAt = function(angle) {
    this.physics.setRotation(angle);
  };

  this.getPosition = function() {
    var position = this.physics.getPosition();
    return position;
  };

  this.getRadius = function() {
    return this.radius;
  };

  FW.GameClosureExtend(this, FW.GameClosurePhysicsViewSyncMixin);
});
