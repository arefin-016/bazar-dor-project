import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db("bazar-dor-projet");

const productionUrl = process.env.BETTER_AUTH_URL as string;

export const auth = betterAuth({
  baseURL: productionUrl || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET as string,

  trustedOrigins: [
    "http://localhost:3000",
    ...(productionUrl ? [productionUrl] : []),
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});