import React, { useState } from "react";
import { Menu, Layout, Avatar, Drawer } from "antd";
import { PiQuestionFill } from "react-icons/pi";

import styles from "../Styles/sidebar.module.css";
import DashboardIcon from "../assets/svg/dashboard.svg?react";
import ReportIcon from "../assets/svg/reporticon.svg?react";
import EmployeeIcon from "../assets/svg/employeecard.svg?react";
import PriceConticon from "../assets/svg/price&Cont.svg?react";
import SkipMealIcon from "../assets/svg/skipmeal.svg?react";
import AdditionalMealIcon from "../assets/svg/additionalmeal.svg?react";
import admin from "../assets/png/adminImg.png";
import ThreeDotsIcon from "../assets/svg/MenuThreeDots.svg";
import HelpIcon from "../assets/svg/help.svg?react";

import { NavLink, useLocation } from "react-router-dom";

import Icon from "@ant-design/icons/lib/components/Icon";
function SideBar({ sidebarRender, setsidebarRender }) {
  const { Sider } = Layout;
  const location = useLocation();
  const regex = /\/form|\/employees|\/all/;
  console.log("DashboardIcon", DashboardIcon);

  const svgIconStyle = {
    fontSize: "1.5em",
  };

  const items = [
    {
      key: "/admin/dashboard",
      icon: <DashboardIcon style={svgIconStyle} />,
      label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,

      className: styles.menuItem,
    },
    {
      key: "/admin/report",
      icon: <ReportIcon style={svgIconStyle} />,
      label: <NavLink to="/admin/report">Report</NavLink>,

      className: styles.menuItem,
    },
    {
      key: "/admin/employee",
      icon: <EmployeeIcon style={svgIconStyle} />,
      label: <NavLink to="/admin/employee">Employees</NavLink>,

      className: styles.menuItem,
    },
    {
      key: "/admin/priceCont",
      icon: <PriceConticon style={svgIconStyle} />,
      label: <NavLink to="/admin/priceCont">Price & Cont</NavLink>,

      className: styles.menuItem,
    },
    {
      key: "/admin/SkipMeal",
      icon: <SkipMealIcon style={svgIconStyle} />,
      label: <NavLink to="/admin/SkipMeal/form">Skip Meal</NavLink>,

      className: styles.menuItem,
    },
    {
      key: "/admin/AddtionalMeal",
      icon: <AdditionalMealIcon style={svgIconStyle} />,
      label: <NavLink to="/admin/AddtionalMeal">Additional Meal</NavLink>,

      className: styles.menuItem,
    },
    {
      key: "/admin/MealComplaint",
      icon: <HelpIcon style={svgIconStyle} />,
      label: <NavLink to="/admin/MealComplaint">Meal Complaint</NavLink>,

      className: styles.menuItem,
    },
  ];
  const onClose = () => {
    // setOpen(false);
    setsidebarRender(false);
  };

  console.log("window", location.pathname);
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
            <Avatar size={32} src={ThreeDotsIcon} />
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
      <Sider
        width={300}
        className={styles.sider}
        // style={{ position: "sticky", top: "0" }}
      >
        <div className={styles.AdminContainer}>
          <div className={styles.innerAdminText}>
            <Avatar size={64} src={admin} />
            <div className={styles.inner}>
              <h4 className={styles.adminName}>Gavano</h4>
              <p className={styles.adminText}>Admin</p>
            </div>
          </div>
          <Avatar size={32} src={ThreeDotsIcon} />
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

export default SideBar;
