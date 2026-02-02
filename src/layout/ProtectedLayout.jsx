import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

const ProtectedLayout = ({ user, setUser }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} setUser={setUser} />

      <div className="flex flex-col flex-1 min-w-0">
        <div className="sticky right-0">
          <Header user={user} setUser={setUser} />
        </div>

        <main className="flex-1 overflow-auto bg-gray-100 p-6">
          <Outlet />
        </main>

        <div className="sticky bottom-0">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
