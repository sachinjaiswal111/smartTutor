import { useParams } from "react-router-dom";

import MeetingHeader from "../component/meeting/MeetingHeader";
import VideoGrid from "../component/meeting/VideoGrid";
import MeetingControls from "../component/meeting/MeetingControls";

import { useMeetingSocket } from "../hooks/useMeetingSocket";
import { useLocalMedia } from "../hooks/useLocalMedia";
import { useWebRTC } from "../hooks/useWebRTC";

const MeetingRoom = () => {
  const { meetingCode } = useParams();

  const { socket, participants } =
    useMeetingSocket(meetingCode);

  const localStream = useLocalMedia();

  const {

    remoteStreams,

} = useWebRTC({

    socket,

    localStream,

});

  return (
    <div className="flex h-screen flex-col bg-slate-900">
      <MeetingHeader meetingCode={meetingCode} />

      <main className="flex-1 overflow-hidden">
       <VideoGrid
    participants={participants}
    localStream={localStream}
    remoteStreams={remoteStreams}
/>
      </main>

      <MeetingControls />
    </div>
  );
};

export default MeetingRoom;