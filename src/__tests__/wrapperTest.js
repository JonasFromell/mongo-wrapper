import { expect } from 'chai'
import { describe, it } from 'mocha'

import Mongo from '../index'

describe('Mongo connection', () => {
  it('Connects to the database at uri', async () => {
    let db = await Mongo.connect('mongodb://localhost:27017/mongo-wrapper-test')

    // Should set static member db to the resolved db of connect
    expect(Mongo.db).to.eql(db);
  })
})
