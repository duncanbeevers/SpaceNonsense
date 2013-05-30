import src.lib.Box2dWeb_2_1_a_3 as Box2D;

var PhysicsEditorBuilder = function(data) {
  this.data = data;
};

PhysicsEditorBuilder.prototype = {
  getFixtureNames: function() {
    var names = [];
  },
  getPhysics: function(bodyName, world, x, y, userData) {
    var bodyData = this.data[bodyName], fixtureData,
        bodyDef = new Box2D.Dynamics.b2BodyDef(),
        fixtureDef = new Box2D.Dynamics.b2FixtureDef(),
        body, fixture,
        i, k;

    bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    // bodyDef.linearDamping = props.linearDamping || 0;
    // bodyDef.angularDamping = props.angularDamping || 0;
    body = world.CreateBody(bodyDef);

    for (i = bodyData.length - 1; i >= 0; i--) {
      fixtureData = bodyData[i];
      fixtureDef.density = fixtureData.density;
      fixtureDef.friction = fixtureData.friction;
      fixtureDef.restitution = fixtureData.restitution;
      fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();

      fixture = body.CreateFixture(fixtureDef);
      fixture.SetUserData(userData);
    }
  }
};

exports = PhysicsEditorBuilder;
