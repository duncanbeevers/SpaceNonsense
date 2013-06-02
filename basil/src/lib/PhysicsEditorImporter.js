import ui.ImageView;
import src.lib.Box2dWeb_2_1_a_3 as Box2D;
import src.lib.FW_GameClosureExtend as FW.GameClosureExtend;
import src.lib.FW_PhysicsMixin as FW.PhysicsMixin;

// Use FW.PhysicsMixin as prototype, no special behavior
function Physics(body) {
  this.body = body;
}
Physics.prototype = FW.PhysicsMixin;

// Define data keys used to peer into JSON payload
var PixelsPerMeterDataKey = "pixelsPerMeter",
    AnchorDataKey         = "anchor",
    BodiesDataKey         = "bodies",
    FixturesDataKey       = "fixtures",
    PolygonShapeDataKey   = "polygon",
    CircleShapeDataKey    = "circle",
    RadiusDataKey         = "radius",
    PositionDataKey       = "position";


// Re-usable data structures, no need to allocate new ones every time
var polygonShape = new Box2D.Collision.Shapes.b2PolygonShape(),
    circleShape  = new Box2D.Collision.Shapes.b2CircleShape(),
    bodyDef      = new Box2D.Dynamics.b2BodyDef(),
    fixtureDef   = new Box2D.Dynamics.b2FixtureDef();

var PhysicsEditorImporter = function(scenarioName) {
  this.scenarioName = scenarioName;
  var source = CACHE["resources/scenarios/" + scenarioName + "/Bodies.json"];
  if (source) {
    this.data = JSON.parse(source);
  } else {
    this.data = {};
  }
};

PhysicsEditorImporter.prototype = {
  getPhysics: function(bodyName, world, x, y, userData) {
    var bodyData = this.data[BodiesDataKey][bodyName],
        fixturesData, fixtureData, shapeData, positionData,
        body, fixture, scalar, vertices, tmpX, tmpY,
        i, k;

    bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    bodyDef.position.x = x;
    bodyDef.position.y = y;

    // bodyDef.linearDamping = props.linearDamping || 0;
    // bodyDef.angularDamping = props.angularDamping || 0;
    body = world.CreateBody(bodyDef);
    fixturesData = bodyData[FixturesDataKey];
    scalar = 1 / bodyData[PixelsPerMeterDataKey];

    for (i = fixturesData.length - 1; i >= 0; i--) {
      fixtureData = fixturesData[i];
      fixtureDef.density = fixtureData.density;
      fixtureDef.friction = fixtureData.friction;
      fixtureDef.restitution = fixtureData.restitution;

      if (fixtureData[PolygonShapeDataKey]) {
        // If polygon
        shapeData = fixtureData[PolygonShapeDataKey];
        vertices = [];

        // Map the coordinates to Box2d vectors
        for (k = shapeData.length - 1; k >= 0; k -= 2) {
          tmpX = shapeData[k - 1] * scalar;
          tmpY = shapeData[k] * scalar;
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

    return new Physics(body);
  },
  getView: function(bodyName, opts) {
    var imageName = "resources/scenarios/" + this.scenarioName + "/" + bodyName + ".png";

    var bodyData = this.data[BodiesDataKey][bodyName],
        anchorData = bodyData[AnchorDataKey],
        scalar = bodyData[PixelsPerMeterDataKey];

    opts = merge(opts, {
      image: imageName,
      anchorX: anchorData[0],
      anchorY: anchorData[1],
      offsetX: -anchorData[0],
      offsetY: -anchorData[1],
      autoSize: true,
      scale: 1 / scalar
    });

    var view = new ui.ImageView(opts);
    return view;
  }
};

exports = PhysicsEditorImporter;
