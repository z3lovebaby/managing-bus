import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Main = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <div style={{ position: "relative", height: "calc(100vh - 64px)" }}>
        <Sidebar isSidebarOpen={isSidebarOpen} role="user" />
        <div
          style={{
            marginLeft: 0, // Map không bị đẩy
            height: "100%",
            transition: "margin-left 0.3s ease", // Cho hiệu ứng mượt khi sidebar xuất hiện
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
