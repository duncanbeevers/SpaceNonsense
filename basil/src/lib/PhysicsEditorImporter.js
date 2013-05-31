import src.lib.Box2dWeb_2_1_a_3 as Box2D;

// Define data keys used to peer into JSON payload
var PixelsToMetersRatioDataKey = "ptm_ratio",
    BodiesDataKey              = "bodies",
    PolygonShapeDataKey        = "polygon",
    CircleShapeDataKey         = "circle",
    RadiusDataKey              = "radius",
    PositionDataKey            = "position";


// Re-usable data structures, no need to allocate new ones every time
var polygonShape = new Box2D.Collision.Shapes.b2PolygonShape(),
    circleShape  = new Box2D.Collision.Shapes.b2CircleShape(),
    bodyDef      = new Box2D.Dynamics.b2BodyDef(),
    fixtureDef   = new Box2D.Dynamics.b2FixtureDef();

var PhysicsEditorBuilder = function(data) {
  this.data = data;
  this.ptmRatio = data[PixelsToMetersRatioDataKey];
};

PhysicsEditorBuilder.prototype = {
  getPhysics: function(bodyName, world, x, y, userData) {
    var bodyData = this.data[BodiesDataKey][bodyName], fixtureData, shapeData, positionData,
        body, fixture, vertices, tmpX, tmpY,
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

      if (fixtureData[PolygonShapeDataKey]) {
        // If polygon
        shapeData = fixtureData[PolygonShapeDataKey];
        vertices = [];
        for (k = shapeData.length - 1; k >= 0; k -= 2) {
          tmpX = shapeData[k - 1];
          tmpY = shapeData[k];
          vertices.unshift(new Box2D.Common.Math.b2Vec2(tmpX, tmpY));
        }
        polygonShape.SetAsArray(vertices, vertices.length);
        fixtureDef.shape = polygonShape;
      } else {
        // TODO: Test out the circle importer
        // I guess it must be a circle
        // shapeData = fixtureData[CircleShapeDataKey];
        // positionData = shapeData[PositionDataKey];
        // tmpX = positionData[0];
        // tmpY = positionData[1];
        // circleShape.SetRadius(shapeData[RadiusDataKey]);
        // circleShape.SetLocalPosition(new Box2D.Common.Math.b2Vec2(tmpX, tmpY));
        // fixtureDef.shape = circleShape;
      }

      fixture = body.CreateFixture(fixtureDef);
      fixture.SetUserData(userData);
    }

    return body;
  }
};

exports = PhysicsEditorBuilder;
