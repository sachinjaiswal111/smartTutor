import { Server } from "socket.io";
import { registerSocketHandlers } from "./socket.js";
import { authenticateSocket } from "./auth.socket.js";


export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });
  io.use(authenticateSocket);
  registerSocketHandlers(io);

  return io;
};