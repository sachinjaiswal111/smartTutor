import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../common/Button";

const NavbarActions = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/create-meeting")}
      className="flex items-center gap-2"
    >
      <Plus size={18} />

      Create Meeting
    </Button>
  );
};

export default NavbarActions;