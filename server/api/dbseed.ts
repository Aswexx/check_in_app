// @ts-nocheck
import { model } from 'mongoose'
import { PartySchema } from './parties/index.get'
import { createFakeParties } from '@/data/dummyParties'

const Party = model('Party', PartySchema)

export default defineEventHandler(async (event) => {
  const dummyParties = createFakeParties()
  try {
    await Party.deleteMany({})
    await Party.insertMany(dummyParties)
  } catch (err) {
    console.error(err)
  }
  
  
  return dummyParties
})
