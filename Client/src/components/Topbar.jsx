import { Bell, LogOut } from "lucide-react";

const Topbar = ({ title }) => {
  return (
    <header className="h-16 bg-white/90 backdrop-blur
 border-b flex items-center justify-between px-8">
      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <Bell />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-gray-500">admin@gmail.com</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
            A
          </div>
        </div>

        <LogOut className="cursor-pointer text-red-500" />
      </div>
    </header>
  );
};

export default Topbar;
