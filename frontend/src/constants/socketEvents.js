export const SOCKET_EVENTS = {
  MEETING_JOIN: "meeting:join",
  MEETING_LEAVE: "meeting:leave",
  MEETING_END: "meeting:end",

  PARTICIPANT_JOINED: "participant:joined",
  PARTICIPANT_LEFT: "participant:left",
  PARTICIPANT_LIST: "participant:list",

  CHAT_SEND: "chat:send",
  CHAT_MESSAGE: "chat:message",

  MIC_TOGGLE: "media:mic-toggle",
  CAMERA_TOGGLE: "media:camera-toggle",
  SCREEN_START: "media:screen-start",
  SCREEN_STOP: "media:screen-stop",

  HAND_RAISE: "hand:raise",
  HAND_LOWER: "hand:lower",

  WEBRTC_OFFER: "webrtc:offer",
  WEBRTC_ANSWER: "webrtc:answer",
  WEBRTC_ICE_CANDIDATE: "webrtc:ice-candidate",
};