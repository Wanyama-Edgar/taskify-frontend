import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PublicLayout = ({ user, setUser }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header user={user} setUser={setUser} />
      </div>
      
      {/* Main Content with top padding to account for fixed header */}
      <main className="flex-1 pt-16 pb-16">
        <Outlet />
      </main>
      
      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
