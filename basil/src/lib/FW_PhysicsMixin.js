import src.lib.Box2dWeb_2_1_a_3 as Box2D;

var FW = this.FW || (this.FW = {});

FW.PhysicsMixin = {
  getPosition: function() {
    var body = this.body,
        position = body.GetPosition(),
        angle = body.GetAngle();

    return {
      x: position.x,
      y: position.y,
      r: angle
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

    this._setBodyInWorldFromBodyDefAndFixtureDef(world, bodyDef, fixtureDef, userData);
  },
  _setBodyInWorldFromBodyDefAndFixtureDef: function(world, bodyDef, fixtureDef, userData) {
    var body = world.CreateBody(bodyDef),
        fixture = body.CreateFixture(fixtureDef);
    fixture.SetUserData(userData);
    this.body = body;
  },
  removeFromPhysics: function() {
    this.body.GetWorld().DestroyBody(this.body);
  },
  getWorld: function() {
    return this.body.GetWorld();
  },
  setRotation: function(angle) {
    this.body.SetAngle(angle);
  },
  setRadius: function(radius) {
    var bodyDef = this._bodyDef,
        fixtureDef = this._fixtureDef;

    var body = this.body,
        world = body.GetWorld(),
        position = body.GetPosition(),
        userData = body.GetFixtureList().GetUserData();

    // Copy the old body's position to the new body def
    bodyDef.position.x = position.x;
    bodyDef.position.y = position.y;

    // Apply the new bigger shape to the fixture def
    fixtureDef.shape = new Box2D.Collision.Shapes.b2CircleShape(radius);

    // Remove the original body from the world
    this.removeFromPhysics();

    // Re-add to physics with the updated defs
    this._setBodyInWorldFromBodyDefAndFixtureDef(world, bodyDef, fixtureDef, userData);
  }
};

exports = FW.PhysicsMixin;
