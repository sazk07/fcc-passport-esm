import 'dotenv/config'
import { MongoClient } from 'mongodb'

export default async (callback) => {
  const URI = process.env.MONGO_URI
  const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  try {
    // Connect to the MongoDB cluster
    await client.connect()
    // Make the appropriate DB calls
    await callback(client)
  } catch (e) {
    // Catch any errors
    console.error(e)
    throw new Error('Unable to connect to database')
  }
}
