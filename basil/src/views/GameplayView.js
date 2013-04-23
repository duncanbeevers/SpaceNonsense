import ui.ImageView;
import ui.resource.Image;
import ui.StackView;

import src.views.FillScreenImageView as FillScreenImageView;
import src.views.BulletView as BulletView;

exports = Class(ui.StackView, function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      width: 576,
      height: 1024
    });

    supr(this, "init", [opts]);

    this.setupBackground();
    this.setupPlayer();
  };

  this.setupBackground = function() {
    new FillScreenImageView({
      superview: this,
      image: "resources/images/bg001.png"
    });
  };

  var player, playerImageView;
  this.setupPlayer = function() {
    player = merge(player, {
      shooting: false,
      r: null,
      bullet001: 5000 // ms cooldown
    });

    playerImageView = new ui.ImageView({
      superview: this,
      autoSize: true,
      layout: "box",
      centerAnchor: true,
      centerX: true,
      centerY: true,
      image: "resources/images/reference_25x25_compass.png"
    });

    this.on("InputStart", function(event, point) {
      player.shooting = 'bullet001';
    });

    this.on("InputOver", function(event, point) {
      player.shooting = false;
    });

    this.on("InputMove", function(event, point) {
      // playerImageView;
      // this;
      // event;
      // point;
      // debugger;
      var pointAt = Math.atan2(point.y - playerImageView.style.y, point.x - playerImageView.style.x);

      player.r = pointAt;
      playerImageView.style.update({ r: pointAt });
    });
  };

  this.fireBullet = function(bulletName) {
    new BulletView(bulletName, {
      superview: this,
      bullet: bulletName,
      x: playerImageView.style.x,
      y: playerImageView.style.y,
      trajectory: player.r
    });
  };

  this.tick = function(dt) {
    // TODO: Cooldown all weapons
    var shooting = player.shooting;

    if (shooting) {
      var cooldown = player[shooting],
          nextShotInKey = shooting + '_nextShotIn',
          nextShotIn = player[nextShotInKey] || 0;

      nextShotIn -= dt;

      if (nextShotIn <= 0) {
        nextShotIn = cooldown;
        this.fireBullet(shooting);
      }
      player[nextShotInKey] = nextShotIn;
    }
  };
});
