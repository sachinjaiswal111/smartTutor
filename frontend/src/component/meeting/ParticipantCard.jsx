const ParticipantCard = ({ participant }) => {
  return (
    <div className="flex aspect-video items-center justify-center rounded-2xl bg-slate-800 shadow-lg">

      <div className="text-center">

        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
          {participant.username.charAt(0)}
        </div>

        <h3 className="text-lg font-semibold text-white">
          {participant.username}
        </h3>

      </div>

    </div>
  );
};

export default ParticipantCard;