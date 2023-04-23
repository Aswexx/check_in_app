import { Nitro } from 'nitropack'
import mongoose from 'mongoose'

export default async (_nitroApp: Nitro) => {
	const { mongodbUri, mongodbAltlasUri } = useRuntimeConfig().public
	
	try {
		await mongoose.connect(mongodbAltlasUri)
		console.log(`connected to${mongodbAltlasUri}`)
	} catch (e) {
		console.error(e)
	}
}