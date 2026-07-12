import { SOCKET_EVENTS } from "./constants.js";
import { getUserSocket } from "./scoketStore.js";

export const registerWebRTCEvents = (io, socket) => {

  // Forward Offer
  socket.on(
    SOCKET_EVENTS.WEBRTC_OFFER,
    ({ targetUserId, offer }) => {

      const targetSocketId =
        getUserSocket(targetUserId);

      if (!targetSocketId) return;

      io.to(targetSocketId).emit(
        SOCKET_EVENTS.WEBRTC_OFFER,
        {
          fromUserId: socket.user.id,
          offer,
        }
      );
    }
  );

  // Forward Answer
  socket.on(
    SOCKET_EVENTS.WEBRTC_ANSWER,
    ({ targetUserId, answer }) => {

      const targetSocketId =
        getUserSocket(targetUserId);

      if (!targetSocketId) return;

      io.to(targetSocketId).emit(
        SOCKET_EVENTS.WEBRTC_ANSWER,
        {
          fromUserId: socket.user.id,
          answer,
        }
      );
    }
  );

  // Forward ICE Candidate
  socket.on(
    SOCKET_EVENTS.WEBRTC_ICE_CANDIDATE,
    ({ targetUserId, candidate }) => {

      const targetSocketId =
        getUserSocket(targetUserId);

      if (!targetSocketId) return;

      io.to(targetSocketId).emit(
        SOCKET_EVENTS.WEBRTC_ICE_CANDIDATE,
        {
          fromUserId: socket.user.id,
          candidate,
        }
      );
    }
  );
};