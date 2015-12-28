import {
  MongoClient
} from 'mongodb'

/**
 * Emulates ES6 proxies as far as needed for use here
 */
class Proxy {

  constructor(target, handler) {

    function handle(method) {
      return function(...args) {
        if (method in handler) {
          return handler[method](args)
        }
      }
    }

    /**
     * Binds getter and setter functions
     */
    function bind(key) {
      let desc = Object.getOwnPropertyDescriptor(target, key)

      // Bind getter and setter function
      Object.defineProperty(this, key, {
        get: handle('get'),
        set: handle('set'),
        enumerable: desc.enumerable,
        configurable: desc.configurable,
      })
    }

    // Bind to each existing property on target
    for (let key in target) {
      bind.call(this, key)
    }
  }

}

/**
 * Emulates ES6 reflections as far as needed for use here
 */
class Reflect {

  constructor() {
    throw 'You\'re trying to instantiate a singleton class!'
  }

  static get (target, prop) {
    if (!prop in target) {
      throw new ReferenceError(`Unknown property: ${prop}`)
    }

    return target[prop]
  }

}

/**
 * Singleton class for managing the connection to a mongodb instance
 */
export default class Mongo {

  constructor() {
    throw 'You\'re trying to instantiate a singleton class!'
  }

  /**
   * @property The connection object
   */
  static db = null

  /**
   * @method Connects to the Mongo instance at uri
   * @param {String} uri The uri to the Mongo instance
   * @return {Promise}
   */
  static connect(uri) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, (error, db) => {
        if (error) {
          reject(err)
        }

        // Wrap the Mongo instance connection object
        // This enables the use of syntax: `db.collection_name`
        Mongo.db = new Proxy({}, {
          get: (target, name) => {
            let col = db.collection(new String(name))

            if (!col) {
              return Reflect.get(target, name)
            }

            return col
          }
        })

        // Resolve promise
        resolve(Mongo.db)
      })
    })
  }

}

/**
 * Export just the database object
 */
export {
  db: Mongo.db
}
