import React, { useState } from "react";
import { FaHome, FaUserAlt, FaBars, FaTasks } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`bg-slate-950 text-white flex flex-col border-r border-slate-800 ${
      isSidebarOpen ? "w-64" : "w-16 md:w-64"
    } transition-all duration-300`}>
      <div className="flex justify-between items-center p-4">
        <h2 className={`text-xl font-bold ${
          isSidebarOpen ? "block" : "hidden md:block"
        }`}>
          Taskify
        </h2>
        <button
          className="block md:hidden hover:cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <IoCloseSharp size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      
      <nav className="mt-4 flex-1">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard"
              className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <MdDashboard size={24} />
              <span className={`ml-4 ${
                isSidebarOpen ? "block" : "hidden md:block"
              }`}>
                Dashboard
              </span>
            </Link>
          </li>

          <li>
            <Link 
              to="/todo"
              className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <FaTasks size={24} />
              <span className={`ml-4 ${
                isSidebarOpen ? "block" : "hidden md:block"
              }`}>
                Tasks
              </span>
            </Link>
          </li>

          <li>
            <Link 
              to="/profile"
              className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <FaUserAlt size={24} />
              <span className={`ml-4 ${
                isSidebarOpen ? "block" : "hidden md:block"
              }`}>
                Profile
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
