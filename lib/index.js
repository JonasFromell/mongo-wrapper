'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Singleton class for managing the connection to a mongodb instance
 */

var Mongo = (function () {
  function Mongo() {
    _classCallCheck(this, Mongo);

    throw 'You\'re trying to instantiate a singleton class!';
  }

  /**
   * @property The connection object
   */

  _createClass(Mongo, null, [{
    key: 'connect',

    /**
     * @method Connects to the Mongo instance at uri
     * @param {String} uri The uri to the Mongo instance
     * @return {Promise}
     */
    value: function connect(uri) {
      return new Promise(function (resolve, reject) {
        _mongodb.MongoClient.connect(uri, function (error, db) {
          if (error) {
            reject(error);
          } else {
            Mongo.db = db;
          }

          // Resolve promise
          resolve(Mongo.db);
        });
      });
    }
  }]);

  return Mongo;
})();

Mongo.db = null;
exports.default = Mongo;