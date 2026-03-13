// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://obcg:Sunpoint210@cluster0.9nzkf5u.mongodb.net/?retryWrites=true&w=majority";
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
