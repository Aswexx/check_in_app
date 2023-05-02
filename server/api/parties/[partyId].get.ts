import { Party } from './index.get'

export default defineEventHandler(async (event) => {
  const partyId = event.context.params?.partyId
  try {
    return await Party.findById(partyId)
  } catch (err) {
    console.error(err)
  }
})
