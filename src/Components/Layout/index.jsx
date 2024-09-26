import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import SideBar from "../SideBar";

function Layout() {
  const [sidebarRender, setsidebarRender] = useState(false);

  return (
    <div className="layout">
      <Header
        sidebarRender={sidebarRender}
        setsidebarRender={setsidebarRender}
        renderIcon={true}
      />
      <div className="main">
        <SideBar
          sidebarRender={sidebarRender}
          setsidebarRender={setsidebarRender}
        />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
