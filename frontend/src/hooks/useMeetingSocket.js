import { useEffect, useState } from "react";
import { socket } from "../services/socket";

export const useMeetingSocket = (meetingCode) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    socket.connect();

    socket.emit(
      "meeting:join",
      { meetingCode },
      (response) => {
        if (!response.success) {
          console.error(response.message);
          return;
        }

        console.log("Meeting joined");

        setParticipants(response.data.participants);
      }
    );

    socket.on("participant:joined", (participant) => {
      setParticipants((prev) => [...prev, participant]);
    });

    return () => {
      socket.off("participant:joined");
      socket.disconnect();
    };
  }, [meetingCode]);

  return {
    socket,
    participants,
  };
};