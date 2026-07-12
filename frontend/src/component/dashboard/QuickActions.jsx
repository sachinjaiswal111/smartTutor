import { useNavigate } from "react-router-dom";

import Button from "../common/Button";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-lg font-semibold">
        Quick Actions
      </h2>

      <Button
        onClick={() => navigate("/create-meeting")}
      >
        Create New Meeting
      </Button>

    </div>
  );
};

export default QuickActions;