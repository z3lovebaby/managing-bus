import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Main = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <div id="layoutSidenav">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
