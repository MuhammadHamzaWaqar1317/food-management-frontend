import React, { useState } from "react";
import { Menu, Layout, Avatar, Drawer, Button } from "antd";
import DashboardIcon from "../assets/svg/dashboard.svg?react";
import ReportIcon from "../assets/svg/reporticon.svg?react";
import EmployeeIcon from "../assets/svg/employeecard.svg?react";

import admin from "../assets/png/adminImg.png";
import threeDots from "../assets/svg/MenuThreeDots.svg";
import styles from "../Styles/sidebar.module.css";
import { NavLink, useLocation } from "react-router-dom";
function UserSideBar({ sidebarRender, setsidebarRender }) {
  const { Sider } = Layout;
  const location = useLocation();
  const regex = /\/form|\/date/;

  const svgIconStyle = {
    fontSize: "1.5em",
  };

  const items = [
    {
      key: "/user/sub",
      icon: <DashboardIcon style={svgIconStyle} />, //<img src={dashboardicon} alt="" />,
      label: <NavLink to="/user/sub">Subscribe</NavLink>,

      className: styles.menuItem,
    },
    {
      key: "/user/skip",
      icon: <ReportIcon style={svgIconStyle} />,
      label: <NavLink to="/user/skip">Skip Meal</NavLink>,

      className: styles.menuItem,
    },
    {
      key: "/user/complaint",
      icon: <EmployeeIcon style={svgIconStyle} />,

      label: <NavLink to="/user/complaint">Complaint</NavLink>,

      className: styles.menuItem,
    },
  ];

  const onClose = () => {
    setsidebarRender(false);
  };

  return (
    <>
      <Drawer onClose={onClose} open={sidebarRender} placement="left">
        <Sider width={300}>
          <div className={styles.AdminContainer}>
            <div className={styles.innerAdminText}>
              <Avatar size={64} src={admin} />
              <div className={styles.inner}>
                <h4 className={styles.adminName}>Gavano</h4>
                <p className={styles.adminText}>Admin</p>
              </div>
            </div>
            <Avatar size={32} src={threeDots} />
          </div>
          <div className={styles.MenuWrapper}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[location.pathname.split(regex)[0]]}
              selectedKeys={[location.pathname.split(regex)[0]]}
              style={{ height: "100%", borderRight: 0 }}
              items={items}
            />
          </div>
        </Sider>
      </Drawer>

      <Sider width={300} className={styles.sider}>
        <div className={styles.AdminContainer}>
          <div className={styles.innerAdminText}>
            <Avatar size={64} src={admin} />
            <div className={styles.inner}>
              <h4 className={styles.adminName}>Gavano</h4>
              <p className={styles.adminText}>Admin</p>
            </div>
          </div>
          <Avatar size={32} src={threeDots} />
        </div>
        <div className={styles.MenuWrapper}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[location.pathname.split(regex)[0]]}
            selectedKeys={[location.pathname.split(regex)[0]]}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
          />
        </div>
      </Sider>
    </>
  );
}

export default UserSideBar;
