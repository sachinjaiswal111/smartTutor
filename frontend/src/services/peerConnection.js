export const createPeerConnection = ({
  localStream,
  onIceCandidate,
  onTrack,
}) => {
  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  });

  if (localStream) {
    localStream.getTracks().forEach((track) => {
      peer.addTrack(track, localStream);
    });
  }

  peer.onicecandidate = (event) => {
    if (event.candidate) {
      onIceCandidate?.(event.candidate);
    }
  };

  peer.ontrack = (event) => {
    onTrack?.(event.streams[0]);
  };

  return peer;
};