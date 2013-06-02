// Programmatically converted to JavaScript by js2coffee
var FW, PI, TWO_PI, centroidOfRectangle, centroidOfSegments, clamp, distance, linearInterpolate, magnitude, normalizeCoordinates, normalizeVector, radiansDiff, rand, random, sample, snap, wrapToCap, wrapToCircle, wrapToCircleDegrees, wrapToHalfCircle,
__slice = [].slice;

FW = this.FW || (this.FW = {});

PI = Math.PI;

TWO_PI = PI * 2;

random = function() {
  var args, min, range;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  switch (args.length) {
    case 0:
      range = 1;
      min = 0;
      break;
    case 1:
      range = args[0];
      min = 0;
      break;
    case 2:
      range = args[1] - args[0];
      min = args[0];
  }
  return (Math.random() * range) + min;
};

rand = function() {
  var args;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return Math.floor(random.apply(this, args));
};

clamp = function(value, min, max) {
  return Math.min(Math.max(min, value), max);
};

wrapToCircle = function(value) {
  return wrapToCap(value, TWO_PI);
};

wrapToHalfCircle = function(value) {
  return wrapToCap(value, PI);
};

wrapToCircleDegrees = function(value) {
  return wrapToCap(value, 360);
};

wrapToCap = function(value, cap) {
  value % cap;
  if (value < 0) {
    value += cap;
  }
  return value;
};

normalizeVector = function(vector, scalar) {
  var x, y;
  if (scalar == null) {
    scalar = 1;
  }
  x = vector[0], y = vector[1];
  return normalizeCoordinates(x, y, scalar);
};

normalizeCoordinates = function(x, y, scalar) {
  var length;
  if (scalar == null) {
    scalar = 1;
  }
  length = magnitude(x, y);
  return [x * scalar / length, y * scalar / length];
};

linearInterpolate = function(targetMin, targetMax, sourceMin, sourceMax, sourceProgress) {
  var progress, sourceRange, targetRange;
  sourceRange = sourceMax - sourceMin;
  targetRange = targetMax - targetMin;
  progress = (sourceProgress - sourceMin) / sourceRange;
  return progress * targetRange + targetMin;
};

sample = function(collection) {
  return collection[rand(collection.length)];
};

centroidOfSegments = function(segments) {
  var x1, x2, xSum, y1, y2, ySum, _i, _len, _ref;
  xSum = 0;
  ySum = 0;
  for (_i = 0, _len = segments.length; _i < _len; _i++) {
    _ref = segments[_i], x1 = _ref[0], y1 = _ref[1], x2 = _ref[2], y2 = _ref[3];
    xSum += x1 + x2;
    ySum += y1 + y2;
  }
  return [xSum / 2 / segments.length, ySum / 2 / segments.length];
};

centroidOfRectangle = function(rectangle) {
  return [rectangle.width / 2 + rectangle.x, rectangle.height / 2 + rectangle.y];
};

radiansDiff = function(radians1, radians2) {
  var diff, sign, size;
  diff = radians2 - radians1;
  sign = 1;
  if (diff < 0) {
    sign = -1;
  }
  size = Math.abs(diff);
  if (size > PI) {
    size = TWO_PI - size;
    sign = sign * -1;
  }
  return size * sign;
};

distance = function(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

magnitude = function(x, y) {
  return distance(0, 0, x, y);
};

snap = function(x, precision) {
  var newX, roundDown, roundDownDelta, roundUp, roundUpDelta, scaleUp;
  scaleUp = x / precision;
  roundDown = Math.floor(scaleUp);
  roundUp = Math.ceil(scaleUp);
  roundDownDelta = Math.abs(scaleUp - roundDown);
  roundUpDelta = Math.abs(scaleUp - roundUp);

  if (roundUpDelta > roundDownDelta) {
    newX = roundDown;
  } else {
    newX = roundUp;
  }

  return newX * precision;
};

FW.Math = {
  PI_AND_A_HALF: PI + PI / 2,
  TWO_PI: TWO_PI,
  RAD_TO_DEG: 180 / PI,
  DEG_TO_RAD: PI / 180,
  random: random,
  rand: rand,
  clamp: clamp,
  snap: snap,
  wrapToCircle: wrapToCircle,
  wrapToCircleDegrees: wrapToCircleDegrees,
  normalizeVector: normalizeVector,
  normalizeCoordinates: normalizeCoordinates,
  linearInterpolate: linearInterpolate,
  sample: sample,
  centroidOfSegments: centroidOfSegments,
  centroidOfRectangle: centroidOfRectangle,
  distance: distance,
  magnitude: magnitude,
  radiansDiff: radiansDiff
};

exports = FW.Math;
