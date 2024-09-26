import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import UserSideBar from "../UserSideBar";
function UserLayout() {
  const [sidebarRender, setsidebarRender] = useState(false);
  return (
    <>
      <div className="layout">
        <Header
          sidebarRender={sidebarRender}
          setsidebarRender={setsidebarRender}
          renderIcon={true}
        />
        <div className="main">
          <UserSideBar
            sidebarRender={sidebarRender}
            setsidebarRender={setsidebarRender}
          />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default UserLayout;
