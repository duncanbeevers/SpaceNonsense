import src.lib.Box2dWeb_2_1_a_3 as Box2D;

var FW = this.FW || (this.FW = {});

exports = {
  getPosition: function() {
    var body = this.fixture.GetBody(),
        position = body.GetPosition();

    return {
      x: position.x,
      y: position.y,
      r: body.GetAngle()
    };
  },
  setupCirclePhysics: function(x, y, radius, userData, world, props) {
    if (!props) {
      props = {};
    }

    var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
    fixtureDef.density = props.density || 1;
    fixtureDef.friction = props.friction || 0.1;
    fixtureDef.restitution = props.restitution || 0.1;

    fixtureDef.shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
    var bodyDef = new Box2D.Dynamics.b2BodyDef();
    bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    bodyDef.linearDamping = props.linearDamping || 0;
    bodyDef.angularDamping = props.angularDamping || 0;

    var fixture = world.CreateBody(bodyDef).CreateFixture(fixtureDef);
    fixture.SetUserData(userData);

    // TODO: Does it makes sense to return this instead of mutating the instance?
    this.fixture = fixture;
  },
  removeFromPhysics: function() {
    var body = this.fixture.GetBody();
    body.GetWorld().DestroyBody(body);
  },
  getWorld: function() {
    var body = this.fixture.GetBody();
    return body.GetWorld();
  }
};
