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
        } else {
          Mongo.db = db;
        }

        // Resolve promise
        resolve(Mongo.db)
      })
    })
  }

}
