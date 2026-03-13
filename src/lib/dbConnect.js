// lib/dbConnect.js
import mongoose from 'mongoose';

// Ensure this file is only executed on the server
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Creates or reuses a cached Mongoose connection.
 * Avoids creating multiple connections across hot reloads and serverless invocations.
 */
let cached = global._mongooseCache;

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

export async function dbConnect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('Missing MONGODB_URI; mongoose connections disabled.');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
      })
      .then((mongooseInstance) => mongooseInstance)
      .catch((error) => {
        console.warn(
          'Mongoose connection failed; continuing without database. Error:',
          error.message,
        );
        cached.promise = null;
        return null;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
