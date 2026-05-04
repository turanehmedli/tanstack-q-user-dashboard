import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  BarChart3,
  Settings,
  UserCircle,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  id: string;
}

interface SidebarProps {
  activeItem: string;
  onItemClick: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(true);

  const navItems: NavItem[] = [
    { label: "Dashboard", icon: <Home size={20} />, id: "dashboard" },
    { label: "Users", icon: <Users size={20} />, id: "users" },
    { label: "Analytics", icon: <BarChart3 size={20} />, id: "analytics" },
    { label: "Settings", icon: <Settings size={20} />, id: "settings" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (id: string) => {
    onItemClick(id);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 flex flex-col ${
          isOpen ? "w-64" : "w-0"
        } lg:w-64`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UD</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">UserDash</h1>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeItem === item.id
                      ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <UserCircle size={32} className="text-gray-400" />
            <div className="text-left">
              <p className="font-medium text-gray-900 text-sm">John Doe</p>
              <p className="text-xs text-gray-500">john.doe@example.com</p>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
