import { useEffect, useRef, useState } from "react";

import { createPeerConnection } from "../services/peerConnection";
import { SOCKET_EVENTS } from "../constants/socketEvents";

export const useWebRTC = ({ socket, localStream }) => {
  const peerConnections = useRef({});
  const [remoteStreams, setRemoteStreams] = useState({});
  /**
   * Create or return an existing Peer Connection
   */
  const createConnection = (userId) => {
    if (peerConnections.current[userId]) {
      return peerConnections.current[userId];
    }

    const peer = createPeerConnection({
      localStream,

      onIceCandidate: (candidate) => {
        socket.emit(SOCKET_EVENTS.WEBRTC_ICE_CANDIDATE, {
          targetUserId: userId,
          candidate,
        });
      },

      onTrack: (stream) => {
        setRemoteStreams((prev) => ({
          ...prev,

          [userId]: stream,
        }));
      },
    });

    peerConnections.current[userId] = peer;

    return peer;
  };

  /**
   * Create Offer
   */
  const createOffer = async (targetUserId) => {
    try {
      const peer = createConnection(targetUserId);

      const offer = await peer.createOffer();

      await peer.setLocalDescription(offer);

      socket.emit(SOCKET_EVENTS.WEBRTC_OFFER, {
        targetUserId,
        offer,
      });

      console.log("📤 Offer sent:", targetUserId);
    } catch (error) {
      console.error("Failed to create offer:", error);
    }
  };

  /**
   * Handle Incoming Offer
   */
  const handleOffer = async ({ fromUserId, offer }) => {
    try {
      const peer = createConnection(fromUserId);

      await peer.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await peer.createAnswer();

      await peer.setLocalDescription(answer);

      socket.emit(SOCKET_EVENTS.WEBRTC_ANSWER, {
        targetUserId: fromUserId,
        answer,
      });

      console.log("📤 Answer sent:", fromUserId);
    } catch (error) {
      console.error("Failed to handle offer:", error);
    }
  };

  /**
   * Existing participants create offer
   * when a new participant joins.
   */
  useEffect(() => {
    if (!socket || !localStream) return;

    const handleParticipantJoined = (participant) => {
      console.log("👤 Participant Joined:", participant);

      createOffer(participant.id);
    };

    socket.on(SOCKET_EVENTS.PARTICIPANT_JOINED, handleParticipantJoined);

    return () => {
      socket.off(SOCKET_EVENTS.PARTICIPANT_JOINED, handleParticipantJoined);
    };
  }, [socket, localStream]);

  /**
   * Listen for incoming offers
   */
  useEffect(() => {
    if (!socket || !localStream) return;

    socket.on(SOCKET_EVENTS.WEBRTC_OFFER, handleOffer);

    return () => {
      socket.off(SOCKET_EVENTS.WEBRTC_OFFER, handleOffer);
    };
  }, [socket, localStream]);
  const handleAnswer = async ({ fromUserId, answer }) => {
    try {
      const peer = peerConnections.current[fromUserId];

      if (!peer) return;

      await peer.setRemoteDescription(new RTCSessionDescription(answer));

      console.log("✅ Answer received from:", fromUserId);
    } catch (error) {
      console.error("Failed to handle answer:", error);
    }
  };
  useEffect(() => {
    if (!socket) return;

    socket.on(SOCKET_EVENTS.WEBRTC_ANSWER, handleAnswer);

    return () => {
      socket.off(SOCKET_EVENTS.WEBRTC_ANSWER, handleAnswer);
    };
  }, [socket]);
  const handleIceCandidate = async ({ fromUserId, candidate }) => {
    try {
      const peer = peerConnections.current[fromUserId];

      if (!peer) return;

      await peer.addIceCandidate(new RTCIceCandidate(candidate));

      console.log("✅ ICE Candidate Added");
    } catch (error) {
      console.error("ICE Candidate Error:", error);
    }
  };
  useEffect(() => {
    if (!socket) return;

    socket.on(SOCKET_EVENTS.WEBRTC_ICE_CANDIDATE, handleIceCandidate);

    return () => {
      socket.off(SOCKET_EVENTS.WEBRTC_ICE_CANDIDATE, handleIceCandidate);
    };
  }, [socket]);

  return {
    peerConnections,
    remoteStreams
  };
};
