// Programmatically converted to JavaScript by js2coffee
var FW, handleContact;

FW = this.FW || (this.FW = {});

FW.NamedContactListener = (function() {

  function NamedContactListener() {
    this._contactListeners = {};
  }

  NamedContactListener.prototype.BeginContact = function(contact, impulse) {
    return handleContact('begin', this._contactListeners, contact);
  };

  NamedContactListener.prototype.EndContact = function(contact, impulse) {
    return handleContact('end', this._contactListeners, contact);
  };

  NamedContactListener.prototype.PreSolve = function(contact, impulse) {
    return handleContact('pre', this._contactListeners, contact, impulse);
  };

  NamedContactListener.prototype.PostSolve = function(contact, impulse) {
    return handleContact('post', this._contactListeners, contact, impulse);
  };

  NamedContactListener.prototype.registerContactListener = function(nameA, nameB, beginContactListener, endContactListener, preSolveListener, postSolveListener) {
    var keyName, _base;
    keyName = [nameA, nameB].join("/");
    (_base = this._contactListeners)[keyName] || (_base[keyName] = []);
    return this._contactListeners[keyName].push({
      begin: beginContactListener,
      end: endContactListener,
      pre: preSolveListener,
      post: postSolveListener
    });
  };

  NamedContactListener.prototype.registerContinuousContactListener = function(nameA, nameB, duringContact) {
    var disableNotifyInContact, enableNotifyInContact, ticker, tickerContact, tickerFixtureA, tickerFixtureB;
    tickerContact = void 0;
    tickerFixtureA = void 0;
    tickerFixtureB = void 0;
    ticker = {
      tick: function() {
        return duringContact(tickerContact, tickerFixtureA, tickerFixtureB);
      }
    };
    enableNotifyInContact = function(contact, fixtureA, fixtureB) {
      tickerContact = contact;
      tickerFixtureA = fixtureA;
      tickerFixtureB = fixtureB;
      return createjs.Ticker.addListener(ticker);
    };
    disableNotifyInContact = function(contact, fixtureA, fixtureB) {
      return createjs.Ticker.removeListener(ticker);
    };
    return this.registerContactListener(nameA, nameB, enableNotifyInContact, disableNotifyInContact);
  };

  return NamedContactListener;

})();

handleContact = function(key, contactListeners, contact, impulse) {
  var fixtureA, fixtureB, listener, listenerMap, nameA, nameB, namePairs, pairName, pairNameA, pairNameB, primary, secondary, userDataA, userDataB, _i, _len, _ref, _results;
  fixtureA = contact.GetFixtureA();
  fixtureB = contact.GetFixtureB();
  userDataA = fixtureA.GetUserData();
  userDataB = fixtureB.GetUserData();
  if (userDataA && userDataB) {
    nameA = userDataA.name;
    nameB = userDataB.name;
    if (nameA === nameB) {
      namePairs = [[nameA, nameB]];
    } else {
      namePairs = [[nameA, nameB], [nameB, nameA]];
    }
    _results = [];
    for (_i = 0, _len = namePairs.length; _i < _len; _i++) {
      _ref = namePairs[_i], pairNameA = _ref[0], pairNameB = _ref[1];
      pairName = [pairNameA, pairNameB].join("/");
      if (contactListeners[pairName]) {
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = contactListeners[pairName];
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            listenerMap = _ref1[_j];
            if (!listenerMap[key]) {
              continue;
            }
            if (pairNameA === nameA) {
              primary = fixtureA;
              secondary = fixtureB;
            } else {
              primary = fixtureB;
              secondary = fixtureA;
            }
            listener = listenerMap[key];
            if (impulse) {
              _results1.push(listener(contact, impulse, primary, secondary));
            } else {
              _results1.push(listener(contact, primary, secondary));
            }
          }
          return _results1;
        })());
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  }
};

exports = FW.NamedContactListener;
