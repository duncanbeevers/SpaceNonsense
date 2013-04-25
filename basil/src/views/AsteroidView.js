import ui.ImageView;

import src.lib.FW_Math as FW.Math;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(player, world, opts) {
    opts = merge(opts, {
      image: "resources/images/asteroid001.png",
      layout: "box",
      centerAnchor: true
    });

    supr(this, "init", [opts]);

    this.player = player;
    this.world = world;

    this.setupAsteroid();
    this.setupPhysics();
  };

  this.setupAsteroid = function() {
    var radius = FW.Math.random(10, 20),
        distanceFromPlayer = FW.Math.random(100, 200),
        approachAngle = FW.Math.random(FW.Math.TWO_PI),
        playerX = this.player.imageView.style.x,
        playerY = this.player.imageView.style.x;

    this.style.x = Math.cos(approachAngle) * distanceFromPlayer + playerX;
    this.style.y = Math.sin(approachAngle) * distanceFromPlayer + playerY;

    this.radius = radius;
  };

  this.setupPhysics = function() {
    var world = this.world,
        radius = this.radius;

    var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
    fixtureDef.density = 0.1;
    fixtureDef.friction = 0.6;
    fixtureDef.restitution = 0.4;

    fixtureDef.shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
    var bodyDef = new Box2D.Dynamics.b2BodyDef();
    bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    bodyDef.position.x = this.style.x;
    bodyDef.position.y = this.style.y;

    this.fixture = world.CreateBody(bodyDef).CreateFixture(fixtureDef);
    this.style.width = radius * 2;
    this.style.height = radius * 2;
  };

  this.tick = function(dt) {
    var body = this.fixture.GetBody(),
        position = body.GetPosition();

    this.style.x = position.x;
    this.style.y = position.y;
    this.style.offsetX = -this.style.width / 2;
    this.style.offsetY = -this.style.height / 2;
  };
});
