import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Topbar = ({ title }) => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const handleLogout = () => {
    logout(); // 🔥 clear token + admin
    navigate("/login", { replace: true });
  };

  return (
    <header className="h-16 bg-white/90 backdrop-blur border-b flex items-center justify-between px-8">
      {/* LEFT */}
      <h1 className="text-lg font-semibold">{title}</h1>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {/* 🔔 Notification */}
        <div className="relative cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </div>

        {/* 👤 ADMIN INFO (REAL DATA) */}
        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <p className="text-sm font-medium">
              {admin?.username || admin?.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500">
              {admin?.email || ""}
            </p>
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center font-semibold uppercase">
            {admin?.username
              ? admin.username[0]
              : admin?.name
              ? admin.name[0]
              : "A"}
          </div>
        </div>

        {/* 🚪 LOGOUT */}
        <LogOut
          onClick={handleLogout}
          className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-600 transition"
          title="Logout"
        />
      </div>
    </header>
  );
};

export default Topbar;
