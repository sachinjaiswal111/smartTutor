import { Outlet } from "react-router-dom";

const MeetingLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Outlet />
    </div>
  );
};

export default MeetingLayout;