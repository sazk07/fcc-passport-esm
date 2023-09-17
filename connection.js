import 'dotenv/config'
import { MongoClient } from 'mongodb'

export const main = async (callback) => {
  const URI = process.env.MONGO_URI
  const client = new MongoClient(URI)
  try {
    // Connect to the MongoDB cluster
    await client.connect()
    console.log('connected successfully to server')
    // Make the appropriate DB calls
    await callback(client)
  } catch (e) {
    // Catch any errors
    console.error(e)
    throw new Error('Unable to connect to database')
  }
}
