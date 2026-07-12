import { registerMeetingEvents } from "./meeting.socket.js";
import { registerWebRTCEvents } from "./webrtc.socket.js";
import {
  addUserSocket,
  removeUserSocket,
} from "./socketStore.js";

export const registerSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Client Connected");
    console.log("Socket ID:", socket.id);
    console.log("User ID:", socket.user.id);

    // Register user -> socket mapping
    addUserSocket(socket.user.id, socket.id);

    // Register all meeting events
    registerMeetingEvents(io, socket);
    registerWebRTCEvents(io, socket);

    socket.on("disconnect", () => {
      console.log("🔴 Client Disconnected");
      console.log("Socket ID:", socket.id);
      console.log("User ID:", socket.user.id);

      // Remove mapping
      removeUserSocket(socket.user.id);
    });
  });
};