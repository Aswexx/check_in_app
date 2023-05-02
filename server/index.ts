import { Nitro } from 'nitropack'
import mongoose from 'mongoose'

export default async (_nitroApp: Nitro) => {
	const { mongodbUri, mongodbAltlasUri } = useRuntimeConfig().public
	
	try {
		await mongoose.connect(mongodbAltlasUri)
	} catch (e) {
		console.error(e)
	}
}