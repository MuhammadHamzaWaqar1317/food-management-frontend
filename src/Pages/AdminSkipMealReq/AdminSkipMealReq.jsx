import { ContainerOutlined, FileTextOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
function AdminSkipmealReq() {
  const location = useLocation();

  const items = [
    {
      label: <NavLink to="/admin/SkipMeal/form">Form</NavLink>,
      key: "/admin/SkipMeal/form",
      icon: <ContainerOutlined />,
    },
    {
      label: (
        <NavLink to="/admin/SkipMeal/employees">Employee Meal Skips</NavLink>
      ),
      key: "/admin/SkipMeal/employees",
      icon: <FileTextOutlined />,
    },
    {
      label: <NavLink to="/admin/SkipMeal/all">All Meal Skips</NavLink>,
      key: "/admin/SkipMeal/all",
      icon: <FileTextOutlined />,
    },
  ];

  return (
    <>
      <div>
        <Menu
          onClick={(e) => setRenderRoute(e.key)}
          selectedKeys={[location.pathname]}
          mode="horizontal"
          items={items}
        />
        <Outlet />
      </div>
    </>
  );
}

export default AdminSkipmealReq;
