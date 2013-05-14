var FW = this.FW || (this.FW = {});

function marry(fn1, fn2) {
  var marriedPair = function() {
    var fn1Return = fn1.apply(this, arguments),
        fn2Return = fn2.apply(this, arguments);

    // Return values from constructor-defined methods take precedence over
    // mixin return values. If constructor version returns `undefined` then
    // the mixin's return value will be propagated.
    if (undefined === fn1Return) {
      return fn2Return;
    } else {
      return fn1Return;
    }
  };

  return marriedPair;
}

// Used for extending the prototype of a GameClosure Class with additional behavior.
// The `init` chain is maintained, though it is suggested that mixins not accept
// arguments to `init` functions they define.
FW.GameClosureExtend = function(constructorPrototype, mixinPrototype) {
  var propertyName, constructorValue, mixinValue;

  for (propertyName in mixinPrototype) {
    mixinValue = mixinPrototype[propertyName];
    constructorValue = constructorPrototype[propertyName];

    // If a method defined on the mixin already exists on the constructor,
    // then replace the constructor's implementation with a dual implementation
    // that invokes both the original and the mixin's version with all supplied
    // arguments.
    if (constructorValue) {
      constructorPrototype[propertyName] = marry(constructorValue, mixinValue);
    } else {
      constructorPrototype[propertyName] = mixinValue;
    }
  };
};

exports = FW.GameClosureExtend;
