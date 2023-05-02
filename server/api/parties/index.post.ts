import { model } from 'mongoose'
import { PartySchema } from './index.get'

const Party = model('Party', PartySchema)

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
		return await Party.create(body)
	} catch (err) {
		console.error(err)
	}
})