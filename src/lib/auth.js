// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";

// const uri = process.env.MONGO_DB_URI;
// if (!uri) {
//   throw new Error("MONGO_DB_URI is not defined in environment variables");
// }

// const options = {
//   autoSelectFamily: false,
// };

// let client;

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClient) {
//     global._mongoClient = new MongoClient(uri, options);
//   }
//   client = global._mongoClient;
// } else {
//   client = new MongoClient(uri, options);
// }

// const db = client.db(process.env.AUTH_DB_NAME);

// export const auth = betterAuth({
//   database: mongodbAdapter(db, {
//     client,
//   }),
//   emailAndPassword: {
//     enabled: true,
//   },
// });

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
