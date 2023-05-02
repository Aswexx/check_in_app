import { model } from 'mongoose'
import { PartySchema } from './index.get'

const Party = model('Party', PartySchema)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
		return await Party.updateOne(
      { _id: body.partyId },
      { $addToSet: { actualAttenders: body.checkInInfoToUpdate } }
    )
  } catch (err) {
    console.error(err)
  }
})