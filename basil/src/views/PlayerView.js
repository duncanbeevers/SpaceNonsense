import ui.ImageView;

import src.lib.Box2dWeb_2_1_a_3 as Box2D;

exports = Class(ui.ImageView, function(supr) {
  this.init = function(world, opts) {
    opts = merge(opts, {
      layout: "box",
      autoSize: true,
      centerAnchor: true,
      image: "resources/images/reference_25x25_compass.png"
    });

    supr(this, "init", [opts]);

    var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
    fixtureDef.density = 1;
    fixtureDef.friction = 0.6;
    fixtureDef.restitution = 0.1;

    // TODO: Make the shape match the graphic size?
    fixtureDef.shape = new Box2D.Collision.Shapes.b2CircleShape(12.5);
    var bodyDef = new Box2D.Dynamics.b2BodyDef();
    bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    bodyDef.position.x = this.style.x;
    bodyDef.position.y = this.style.y;
    this.fixture = world.CreateBody(bodyDef).CreateFixture(fixtureDef);
  };
});
