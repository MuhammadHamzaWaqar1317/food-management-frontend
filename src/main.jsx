import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../store.js";
import App from "./App.jsx";
import "./index.css";
import AdminAdditionalMealReq from "./Pages/AdminAdditionalMealReq/AdminAdditionalMealReq.jsx";
import AdminDashboardDisplay from "./Pages/AdminDashboardDisplay/AdminDashboardDisplay.jsx";
import AdminEmployeeData from "./Pages/AdminEmployeeData/AdminEmployeeData.jsx";
import AdminMealReport from "./Pages/AdminMealReport/AdminMealReport.jsx";
import AdminPriceCont from "./Pages/AdminPriceCont/AdminPriceCont.jsx";
import AdminSkipMealReq from "./Pages/AdminSkipMealReq/AdminSkipMealReq.jsx";
import EmployeeMealComplaint from "./Pages/EmployeeMealComplaint/EmployeeMealComplaint.jsx";
import EmployeeSkipMeal from "./Pages/EmployeeSkipMeal/EmployeeSkipMeal.jsx";
import EmployeeSubscription from "./Pages/EmployeeSubscribe/EmployeeSubscription.jsx";

import AdminSkipMeal from "./Components/AdminSkipMeal.jsx";
import AdminAllMealSkips from "./Components/AdminAllMealSkips.jsx";
import AdminViewMealSkips from "./Components/AdminViewMealSkips.jsx";

import SkipMeal from "./Components/SkipMeal.jsx";
import UserSkipMealDate from "./Components/UserSkipMealDate.jsx";

import SignUp from "./Components/SignUp.jsx";
import SignIn from "./Components/SignIn.jsx";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AdminMealComplaint from "./Components/AdminMealComplaint.jsx";
import Layout from "./Components/Layout/index.jsx";
import UserLayout from "./Components/UserLayout/UserLayout.jsx";

import PublicRoute from "./Components/PublicRoutes/PublicRoute.jsx";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes.jsx";

import { constant } from "./constants/constant.js";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <ProtectedRoutes allowedRole={[constant.admin]}>
        <Layout />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={"/admin/dashboard"} />,
      },

      {
        path: "priceCont",

        element: <AdminPriceCont />,
      },
      {
        path: "report",

        element: <AdminMealReport />,
      },
      {
        path: "SkipMeal",

        element: <AdminSkipMealReq />,
        children: [
          {
            index: true,
            element: <Navigate to={"/admin/SkipMeal/form"} />, //<AdminSkipMeal />,
          },
          {
            path: "form",
            element: <AdminSkipMeal />,
          },
          {
            path: "employees",
            element: <AdminViewMealSkips />,
          },
          {
            path: "all",
            element: <AdminAllMealSkips />,
          },
        ],
      },
      {
        path: "AddtionalMeal",
        element: <AdminAdditionalMealReq />,
      },
      {
        path: "employee",

        element: <AdminEmployeeData />,
      },
      {
        path: "dashboard",

        element: <AdminDashboardDisplay />,
      },
      {
        path: "MealComplaint",
        element: <AdminMealComplaint />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoutes allowedRole={[constant.user]}>
        <UserLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={"/user/sub"} />,
      },

      {
        path: "sub",

        element: <EmployeeSubscription />,
      },
      {
        path: "skip",

        element: <EmployeeSkipMeal />,
        children: [
          {
            index: true,
            element: <Navigate to={"/user/skip/form"} />,
          },
          {
            path: "form",

            element: <SkipMeal />,
          },
          {
            path: "date",

            element: <UserSkipMealDate />,
          },
        ],
      },
      {
        path: "complaint",

        element: <EmployeeMealComplaint />,
      },
    ],
  },
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
