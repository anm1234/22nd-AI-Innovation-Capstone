import React from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Upload,
  CalendarDays,
  GraduationCap,
  Settings,
} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "advisor",
      label: "AI Advisor",
      icon: <MessageSquare size={20} />,
    },
    {
      id: "transcript",
      label: "Transcript",
      icon: <Upload size={20} />,
    },
    {
      id: "planner",
      label: "Semester Planner",
      icon: <CalendarDays size={20} />,
    },
    {
      id: "degree",
      label: "Degree Progress",
      icon: <GraduationCap size={20} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Navigation</h2>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-button ${
              activePage === item.id ? "active" : ""
            }`}
            onClick={() => setActivePage(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>UMBC AI Advisor</p>
        <span>Version 1.0</span>
      </div>
    </aside>
  );
}

export default Sidebar;