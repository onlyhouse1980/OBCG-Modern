import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const isDevelopment = process.env.NODE_ENV === 'development';

const globalForMongo = globalThis;

let cachedClientPromise = globalForMongo._mongoClientPromise ?? null;

function createClientPromise() {
  if (!uri) {
    console.warn('MONGODB_URI is not set; MongoDB features are disabled.');
    return Promise.resolve(null);
  }

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 20000,
  });

  return client
    .connect()
    .then(() => client)
    .catch((error) => {
      console.warn(
        'MongoDB connection failed; falling back to local data. Error:',
        error.message,
      );
      return null;
    });
}

export async function getMongoClient() {
  if (!cachedClientPromise) {
    cachedClientPromise = createClientPromise();
    if (isDevelopment) {
      globalForMongo._mongoClientPromise = cachedClientPromise;
    }
  }

  const client = await cachedClientPromise;

  if (!client) {
    // Reset so we can retry on the next call.
    cachedClientPromise = null;
    if (isDevelopment) {
      delete globalForMongo._mongoClientPromise;
    }
  }

  return client;
}

export default getMongoClient;
