import { LayoutDashboard, MessageSquare, Layers, HelpCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg
     ${isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"}`;

  return (
    <aside
      className={`bg-white/90 backdrop-blur
 transition-all duration-300 ${
        open ? "w-64" : "w-20"
      }`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <span className={`font-bold ${!open && "hidden"}`}>Admin</span>
        <button onClick={() => setOpen(!open)}>☰</button>
      </div>

      <nav className="p-3 space-y-2">
        <NavLink to="/" className={linkClass}>
          <LayoutDashboard size={18} />
          {open && "Dashboard"}
        </NavLink>

        <NavLink to="/testimonials" className={linkClass}>
          <MessageSquare size={18} />
          {open && "Testimonials"}
        </NavLink>

        <NavLink to="/services" className={linkClass}>
          <Layers size={18} />
          {open && "Services"}
        </NavLink>

        <NavLink to="/enquiries" className={linkClass}>
          <HelpCircle size={18} />
          {open && "Enquiries"}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
