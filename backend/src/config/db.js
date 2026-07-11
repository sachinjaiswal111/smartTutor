import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "../db/schema/index.js";
// console.log(Object.keys(schema));

const client = postgres(process.env.SUPPA_DATABASE_URI, {

  prepare: false,
  max: 10 
});

export const db = drizzle({ client: client });

export async function connectDB() {
  try {
    await client`SELECT 1`;
    console.log("✅ PostgreSQL Connected");
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1);
  }
}

export { client };