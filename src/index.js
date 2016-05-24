import {
  MongoClient
} from 'mongodb'

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
          reject(error)
        }

        // Wrap the Mongo instance connection object
        // This enables the use of syntax: `db.collection_name`
        Mongo.db = new Proxy(db, {
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
