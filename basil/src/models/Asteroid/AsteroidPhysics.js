import src.lib.FW_Math as FW.Math;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(function(supr) {
  this.init = function(asteroid, x, y, radius, player, world) {
    this.asteroid = asteroid;
    this.world = world;
    this.setupPhysics(x, y, radius, player);
  };

  this.setupPhysics = function(x, y, radius, player) {
    var world = this.world;

    var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
    fixtureDef.density = 1;
    fixtureDef.friction = 0.2;
    fixtureDef.restitution = 1;

    fixtureDef.shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
    var bodyDef = new Box2D.Dynamics.b2BodyDef();
    bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    bodyDef.angularDamping = 0.01;
    bodyDef.linearDamping = 0.01;

    this.fixture = world.CreateBody(bodyDef).CreateFixture(fixtureDef);
    this.fixture.SetUserData(this.asteroid);

    // Apply initial impulse to get the asteroid moving
    var body = this.fixture.GetBody(),
        position = body.GetPosition(),
        playerPosition = player.getPosition(),
        trajectory = Math.atan2(position.x - playerPosition.x, position.y - playerPosition.y),
        impulseForce = 1000; // Math.random() * 5 + 30;

    this.fixture.GetBody().ApplyImpulse(
      new Box2D.Common.Math.b2Vec2(Math.cos(trajectory) * impulseForce, Math.sin(trajectory) * impulseForce),
      new Box2D.Common.Math.b2Vec2(position.x, position.y)
    );
  };

  this.approachPlayer = function(player) {
    var body = this.fixture.GetBody(),
        position = body.GetPosition(),
        playerPosition = player.getPosition(),
        playerDistance = FW.Math.distance(playerPosition.x, playerPosition.y, position.x, position.y),
        impulseForce = 100 / Math.min(1, Math.sqrt(playerDistance)),
        trajectory = Math.atan2(playerPosition.y - position.y, playerPosition.x - position.x);

    body.ClearForces();
    body.ApplyForce(
      new Box2D.Common.Math.b2Vec2(Math.cos(trajectory) * impulseForce, Math.sin(trajectory) * impulseForce),
      new Box2D.Common.Math.b2Vec2(position.x, position.y)
    );
  };

  this.getPosition = function() {
    var body = this.fixture.GetBody(),
        position = body.GetPosition();

    return {
      x: position.x,
      y: position.y,
      r: body.GetAngle()
    };
  };
});
