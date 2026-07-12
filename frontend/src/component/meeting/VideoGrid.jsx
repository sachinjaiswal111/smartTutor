import ParticipantCard from "./ParticipantCard";
import LocalVideo from "./LocalVideo";
import RemoteVideo from "./RemoteVideo";

const VideoGrid = ({
  participants,
  localStream,
  remoteStreams,
}) => {
  return (
    <div className="grid h-full place-items-center p-8">
      <div className="grid w-full max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">

        {/* Local Video */}
        {localStream && (
          <LocalVideo stream={localStream} />
        )}

        {/* Remote Videos */}
        {Object.entries(remoteStreams).map(
          ([userId, stream]) => (
            <RemoteVideo
              key={userId}
              stream={stream}
            />
          )
        )}

        {/* Participant Info */}
        {participants.map((participant) => (
          <ParticipantCard
            key={participant.id}
            participant={participant}
          />
        ))}

      </div>
    </div>
  );
};

export default VideoGrid;