import NavbarActions from "./NavbarActiions.jsx";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <header className="flex h-18 items-center justify-between border-b border-gray-200 bg-white px-8">

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Welcome back to SmartTutor
        </p>
      </div>

      <div className="flex items-center gap-4">
        <NavbarActions />
        <UserMenu />
      </div>

    </header>
  );
};

export default Navbar;