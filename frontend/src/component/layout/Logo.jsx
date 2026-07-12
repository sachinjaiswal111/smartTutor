import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

import { dashboardNavigation } from "../../constants/navigation";

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-gray-200 bg-white">

      {/* Logo */}
      <Logo />

      {/* Navigation */}
      <nav className="mt-6 flex-1 space-y-2">
        {dashboardNavigation.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <p className="text-center text-xs text-gray-400">
          SmartTutor v1.0
        </p>
      </div>

    </aside>
  );
};

export default Sidebar;