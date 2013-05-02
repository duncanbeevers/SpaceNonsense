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

    this.name = "Asteroid";
    this.player = player;
    this.world = world;

    this.setupAsteroid();
    this.setupPhysics();
  };

  this.setupAsteroid = function() {
    var radius = FW.Math.random(3, 5),
        distanceFromPlayer = FW.Math.random(10, 20),
        approachAngle = FW.Math.random(FW.Math.TWO_PI),
        playerPosition = this.player.getPosition();

    this.style.x = Math.cos(approachAngle) * distanceFromPlayer + playerPosition.x;
    this.style.y = Math.sin(approachAngle) * distanceFromPlayer + playerPosition.y;
    this.style.width = radius * 2;
    this.style.height = radius * 2;

    this.radius = radius;
  };

  this.setupPhysics = function() {
    var world = this.world,
        radius = this.radius;

    var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
    fixtureDef.density = 1;
    fixtureDef.friction = 0.2;
    fixtureDef.restitution = 1;

    fixtureDef.shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
    var bodyDef = new Box2D.Dynamics.b2BodyDef();
    bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    bodyDef.position.x = this.style.x;
    bodyDef.position.y = this.style.y;
    bodyDef.angularDamping = 0.01;

    this.fixture = world.CreateBody(bodyDef).CreateFixture(fixtureDef);
    this.fixture.SetUserData(this);

    // Apply initial impulse to get the asteroid moving
    var body = this.fixture.GetBody(),
        position = body.GetPosition(),
        playerPosition = this.player.getPosition(),
        trajectory = Math.atan2(position.x - playerPosition.x, position.y - playerPosition.y),
        impulseForce = 1000; // Math.random() * 5 + 30;

    this.fixture.GetBody().ApplyImpulse(
      new Box2D.Common.Math.b2Vec2(Math.cos(trajectory) * impulseForce, Math.sin(trajectory) * impulseForce),
      new Box2D.Common.Math.b2Vec2(position.x, position.y)
    );

  };

  this.tick = function(dt) {
    var body = this.fixture.GetBody(),
        position = body.GetPosition();

    this.style.x = position.x;
    this.style.y = position.y;
    this.style.offsetX = -this.style.width / 2;
    this.style.offsetY = -this.style.height / 2;
    this.style.r = body.GetAngle();

    var playerPosition = this.player.getPosition(),
        playerDistance = FW.Math.distance(playerPosition.x, playerPosition.y, this.style.x, this.style.y),
        impulseForce = 100 / Math.min(1, Math.sqrt(playerDistance)),
        trajectory = Math.atan2(playerPosition.y - this.style.y, playerPosition.x - this.style.x);

    body.ClearForces();
    body.ApplyForce(
      new Box2D.Common.Math.b2Vec2(Math.cos(trajectory) * impulseForce, Math.sin(trajectory) * impulseForce),
      new Box2D.Common.Math.b2Vec2(position.x, position.y)
    );
  };
});
