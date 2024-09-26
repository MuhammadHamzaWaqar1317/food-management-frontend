import React, { useState } from "react";
import SkipMeal from "../../Components/SkipMeal";
import { Menu } from "antd";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { ContainerOutlined, FileTextOutlined } from "@ant-design/icons";
import UserSkipMealDate from "../../Components/UserSkipMealDate";

function EmployeeSkipMeal() {
  const [renderRoute, setRenderRoute] = useState("skipform");
  const location = useLocation();

  const items = [
    {
      label: <NavLink to="/user/skip/form">Form</NavLink>,
      key: "/user/skip/form",
      icon: <ContainerOutlined />,
    },
    {
      label: <NavLink to="/user/skip/date">Meal Skips</NavLink>,
      key: "/user/skip/date",
      icon: <FileTextOutlined />,
    },
  ];
  const routes = {
    skipform: (
      <>
        <SkipMeal />
      </>
    ),

    skipMealDates: (
      <>
        <UserSkipMealDate />
      </>
    ),
  };

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
        {/* {routes[renderRoute]} */}
      </div>
    </>
  );
}

export default EmployeeSkipMeal;
