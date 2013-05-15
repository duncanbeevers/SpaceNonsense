import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(function(supr) {
  this.init = function(player, x, y, radius, world) {
    this.player = player;
    this.world = world;
    this.setupPhysics(x, y, radius);
  };

  this.setupPhysics = function(x, y, radius) {
    var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
    fixtureDef.density = 5;
    fixtureDef.friction = 0.6;
    fixtureDef.restitution = 0.1;

    fixtureDef.shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
    var bodyDef = new Box2D.Dynamics.b2BodyDef();
    bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    bodyDef.linearDamping = 0.1;
    bodyDef.angularDamping = 1;
    this.fixture = this.world.CreateBody(bodyDef).CreateFixture(fixtureDef);
    this.fixture.SetUserData(this.player);
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
