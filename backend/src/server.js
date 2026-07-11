import app from "./app.js";
import "dotenv/config";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 4000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer();