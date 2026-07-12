import { Bell } from "lucide-react";

const UserMenu = () => {
  return (
    <div className="flex items-center gap-4">

      <button className="rounded-full p-2 transition hover:bg-gray-100">
        <Bell size={20} />
      </button>

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
          S
        </div>

        <div>
          <p className="text-sm font-semibold">
            Sachin
          </p>

          <p className="text-xs text-gray-500">
            Tutor
          </p>
        </div>

      </div>

    </div>
  );
};

export default UserMenu;