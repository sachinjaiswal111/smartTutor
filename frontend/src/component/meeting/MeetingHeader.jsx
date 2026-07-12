import { useParams } from "react-router-dom";

const MeetingHeader = () => {
  const { meetingCode } = useParams();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-700 bg-slate-800 px-6 text-white">

      <div>
        <h2 className="text-lg font-semibold">
          SmartTutor Meeting
        </h2>

        <p className="text-sm text-slate-400">
          Code: {meetingCode}
        </p>
      </div>

      <div className="text-sm text-slate-400">
        Live Meeting
      </div>

    </header>
  );
};

export default MeetingHeader;