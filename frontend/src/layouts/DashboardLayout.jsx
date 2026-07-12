import { Outlet } from "react-router-dom";

import Sidebar from "../component/layout/Sidebar.jsx";
import Navbar from "../component/layout/Navbar.jsx";
import { item } from "../constants/navigation.js";
const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50">

      <Sidebar item={item}/>

      <div className="flex flex-1 flex-col">

        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;