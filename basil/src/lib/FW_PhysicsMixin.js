import src.lib.Box2dWeb_2_1_a_3 as Box2D;

var FW = this.FW || (this.FW = {});

function delay(fn) {
  setTimeout(fn);
}

FW.PhysicsMixin = {
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

    this._fixtureDef = fixtureDef;
    this._bodyDef = bodyDef;

    this._setFixtureInWorldFromBodyDefAndFixtureDef(world, bodyDef, fixtureDef, userData);
  },
  _setFixtureInWorldFromBodyDefAndFixtureDef: function(world, bodyDef, fixtureDef, userData) {
    var fixture = world.CreateBody(bodyDef).CreateFixture(fixtureDef);
    fixture.SetUserData(userData);
    this.fixture = fixture;
  },
  removeFromPhysics: function() {
    var instance = this;
    delay(function() { instance._removeFromPhysics(); });
  },
  _removeFromPhysics: function() {
    var body = this.fixture.GetBody();
    body.GetWorld().DestroyBody(body);
  },
  getWorld: function() {
    var body = this.fixture.GetBody();
    return body.GetWorld();
  },
  setRadius: function(radius) {
    var instance = this;
    delay(function() {
      var bodyDef = instance._bodyDef,
          fixtureDef = instance._fixtureDef;

      var originalFixture = instance.fixture,
          body = originalFixture.GetBody(),
          world = body.GetWorld(),
          position = body.GetPosition(),
          userData = originalFixture.GetUserData();

      // Copy the old body's position to the new body def
      bodyDef.position.x = position.x;
      bodyDef.position.y = position.y;

      // Apply the new bigger shape to the fixture def
      fixtureDef.shape = new Box2D.Collision.Shapes.b2CircleShape(radius);

      // Remove the original body from the world
      instance._removeFromPhysics();

      // Re-add to physics with the updated defs
      instance._setFixtureInWorldFromBodyDefAndFixtureDef(world, bodyDef, fixtureDef, userData);
    });
  }
};

exports = FW.PhysicsMixin;
