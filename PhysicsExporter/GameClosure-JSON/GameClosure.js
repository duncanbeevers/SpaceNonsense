exports = {{% for body in bodies %}{% if not forloop.first %},{% endif %}
  "{{body.name}}": [
    {% for fixture in body.fixtures %}{% if not forloop.first %},
    {% endif %}{% for polygon in fixture.polygons %}{% if not forloop.first %} ,
    {% endif %}{ "density": {{fixture.density}}, "friction": {{fixture.friction}}, "restitution": {{fixture.restitution}}, {% if fixture.isSensor %}"isSensor"=true, {% endif %} "filter": { "categoryBits": {{fixture.filter_categoryBits}}, "maskBits": {{fixture.filter_maskBits}} }, "shape": [ {% for point in polygon %}{% if not forloop.first %}, {% endif %}{{point.x}}, {{point.y}}{% endfor %} ] }{% endfor %}{% endfor %}
  ]{% endfor %}
};
