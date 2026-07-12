import {
  validateMeetingConnection,
  getMeetingParticipants,
} from "../services/scoket.service.js";

export const registerMeetingEvents = (io, socket) => {
  socket.on("meeting:join", async ({ meetingCode }, callback) => {
    try {
      const meeting = await validateMeetingConnection(
        meetingCode,
        socket.user.id,
      );

      socket.join(meetingCode);
      const participants = await getMeetingParticipants(meeting.id);

      // io.to(meetingCode).emit("participant:joined", {
      //   userId: socket.user.id,
      //   username: socket.user.username,
      // });
      socket.to(meetingCode).emit("participant:joined", {
        id: socket.user.id,
        username: socket.user.username,
      });
      callback({
        success: true,
        message: "Joined meeting successfully.",
        data: {
          meetingId: meeting.id,
          meetingCode,
          participants,
        },
      });
    } catch (error) {
      callback({
        success: false,
        message: error.message,
      });
    }
  });
};
