import { NavLink } from "react-router-dom";
import clsx from "clsx";

const SidebarItem = ({ item }) => {
  const Icon = item.icon;
  
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        clsx(
          "mx-3 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        )
      }
    >
      <Icon size={20} />

      <span>{item.title}</span>
    </NavLink>
  );
};

export default SidebarItem;