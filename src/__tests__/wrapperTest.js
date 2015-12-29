import { expect } from 'chai'
import { describe, it } from 'mocha'

import Mongo from '../index'

describe('Mongo connection', () => {
  it('Connects to the database at uri', async () => {
    let db = await Mongo.connect('mongodb://localhost:27017/mongo-wrapper-test')

    // Allow db.collection_name syntax
    let result = await db.tests.findOne({_id: "1"})

    expect(result.id).to.eql("1")
  })
})
