var FW = this.FW || (this.FW = {});

var Dispatcher = function() {
};

Dispatcher.prototype = {
  on: function(eventName, fn) {
    var map = this._work || (this._work = {}),
        list = map[eventName] || (map[eventName] = []);

    list.push(fn);
  },
  trigger: function(eventName) {
    var list = (this._work || {})[eventName],
        i;
    if (list) {
      for (i = list.length - 1; i >= 0; i--) {
        list[i]();
      }
    }
  },
  off: function(eventName, fn) {
    var list = (this._work || {})[eventName],
        i, fn2;
    if (list) {
      for (i = list.length - 1; i >= 0; i--) {
        fn2 = list[i];
        if (fn2 === fn) {
          break;
        }
      }
      if (i >= 0) {
        list.splice(i, 1);
      }
    }
  }
};

FW.Dispatcher = Dispatcher;

exports = FW.Dispatcher;
