import "dotenv/config";
import postgres from "postgres";

const client = postgres(process.env.SUPPA_DATABASE_URI, {
  prepare: false,
});

try {
  console.log("Testing connection...");

  const now = await client`SELECT NOW()`;
  console.log("NOW:", now);

  const users = await client`
    SELECT * FROM users LIMIT 5
  `;

  console.log("Users:", users);

  console.log("✅ Everything works!");
} catch (err) {
  console.error("❌ Error:");
  console.error(err);
} finally {
  await client.end();
}