var FW = this.FW || (this.FW = {});

var Dispatcher = function() {
};

Dispatcher.prototype = {
  on: function(eventName, fn, bindTarget) {
    var map = this._work || (this._work = {}),
        list = map[eventName] || (map[eventName] = []);

    list.push([ fn, bindTarget ]);
  },
  trigger: function(eventName) {
    var list = (this._work || {})[eventName],
        i, args = Array.prototype.slice.call(arguments, 1);
    if (list) {
      for (i = list.length - 1; i >= 0; i--) {
        list[i][0].apply(list[i][1], args);
      }
    }
  },
  off: function(eventName, fn, bindTarget) {
    var list = (this._work || {})[eventName],
        i, fn2, bindTarget2;
    if (list) {
      for (i = list.length - 1; i >= 0; i--) {
        fn2 = list[i][0];
        bindTarget2 = list[i][1];
        if (fn2 === fn && bindTarget === bindTarget2) {
          break;
        }
      }
      if (i >= 0) {
        list.splice(i, 1);
      }
    }
  },
  offByBindTarget: function(eventName, bindTarget) {
    var list = (this._work || {})[eventName],
        i, bindTarget2;

    if (list) {
      for (i = list.length - 1; i >= 0; i--) {
        bindTarget2 = list[i][1];
        if (bindTarget === bindTarget2) {
          list.splice(i, 1);
        }
      }
    }
  }
};

FW.Dispatcher = Dispatcher;

exports = FW.Dispatcher;
