import "dotenv/config";
import { defineConfig } from "drizzle-kit";
console.log(process.env.SUPPA_DATABASE_URI)
export default defineConfig({
  schema: "./src/db/schema/index.js",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.SUPPA_DATABASE_URI,
  },
});