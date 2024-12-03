import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Main = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <div>
      {/* Header triggers sidebar toggle */}
      <Header toggleSidebar={() => toggleDrawer(true)} />
      <div style={{ position: "relative", height: "100vh" }}>
        {/* Sidebar with absolute position */}
        <Sidebar
          drawerOpen={drawerOpen}
          toggleDrawer={toggleDrawer}
          role="manager"
        />
        {/* Content remains fixed */}
        <div
          style={{
            position: "relative",
            height: "100%",
            overflow: "auto", // Handle content overflow
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
