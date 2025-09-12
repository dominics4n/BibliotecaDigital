import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("❌ MONGODB_URI no está definido en .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,  // aunque ya sale como deprecated, no hace daño
      useUnifiedTopology: true
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Producción con validación estricta
  client = new MongoClient(uri, {
    tls: true,
    tlsAllowInvalidCertificates: false,
    minPoolSize: 1,
    maxPoolSize: 5,
  });
  clientPromise = client.connect();
}

export default clientPromise;
