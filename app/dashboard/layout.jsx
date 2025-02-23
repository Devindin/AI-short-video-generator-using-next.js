import React from "react";
import Header from "./_components/Header";
import Sidenav from "./_components/Sidenav";

function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="hidden md:block h-screen bg-white fixed w-64 mt-[25px]">
          <Sidenav />
        </div>
        <div className="flex-1 md:ml-64 p-10">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
