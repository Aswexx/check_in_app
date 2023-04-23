import { Schema, model } from 'mongoose'

export const PartySchema = new Schema({
  title: {
    type: String
  },
  date: {
    type: Date
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
  const partyId = event.context.params?.partyId
  console.log('hit', partyId)
  try {
    const result = await Party.find()
    console.log('result', result)
    return result
  } catch (err) {
    console.error(err)
  }
})
