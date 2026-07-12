import app from "./app.js";
import http from 'http'
import "dotenv/config";
import { connectDB } from "./config/db.js";
import { initializeSocket } from "./socket/index.js";
const PORT = process.env.PORT || 4000;

async function startServer() {
  await connectDB();
  const server = http.createServer(app);
  initializeSocket(server);

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer();