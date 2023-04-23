import { model } from 'mongoose'
import { PartySchema } from './index.get'

const Party = model('Party', PartySchema)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('bk-recieve', body)

  try {
    console.log(body)
		return await Party.updateOne({ _id: body.partyId },
			{ $push: { actualAttenders: body.checkInName } })
  } catch (err) {
    console.error(err)
  }
})
