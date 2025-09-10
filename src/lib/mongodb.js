import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // lo pondremos en .env
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Debes definir MONGODB_URI en tu .env");
}

if (process.env.NODE_ENV === "development") {
  // Evita crear multiples clientes en desarrollo
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // producción
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
