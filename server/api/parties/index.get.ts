import { Schema, model } from 'mongoose'

export const PartySchema = new Schema({
  title: {
    type: String
  },
  date: {
    type: Date
  },
  earliestCheckable: {
    type: Number
  },
  latestCheckable: {
    type: Number
  },
  address: {
    type: String
  },
  location: {
    type: Map
  },
  expectedAttenders: {
    type: Array
  },
  actualAttenders: {
    type: Array
  }
})

export const Party = model('Party', PartySchema)

export default defineEventHandler(async (event) => {
  try {
    return await Party.find().sort({ date: 'desc' })
  } catch (err) {
    console.error(err)
  }
})
