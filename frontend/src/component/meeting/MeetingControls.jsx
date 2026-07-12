import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MonitorUp,
  MessageSquare,
  Users,
} from "lucide-react";

import Button from "../common/Button";

const MeetingControls = () => {
  return (
    <footer className="flex h-24 items-center justify-center gap-4 border-t border-slate-700 bg-slate-800">

      <Button variant="secondary">
        <Mic size={18} />
      </Button>

      <Button variant="secondary">
        <Video size={18} />
      </Button>

      <Button variant="secondary">
        <MonitorUp size={18} />
      </Button>

      <Button variant="secondary">
        <MessageSquare size={18} />
      </Button>

      <Button variant="secondary">
        <Users size={18} />
      </Button>

      <Button variant="danger">
        <PhoneOff size={18} />
      </Button>

    </footer>
  );
};

export default MeetingControls;