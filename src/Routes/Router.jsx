import { createBrowserRouter } from "react-router";

import RootLayout from "../Layout/RootLayout/RootLayout";

import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Meals from "../Pages/Meals/Meals";

import PrivetRoute from "./PrivetRoute";
import DashBoardLayout from "../Layout/DashboardLayout/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import MealsDetails from "../Pages/MealsDetails/MealsDetails";
import Order from "../Pages/Order/Order";
import AdminRoute from "./AdminRoute";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import MyOrder from "../Pages/Dashboard/MyOrder/MyOrder";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/meals",
        Component: Meals,
      },
      {
        path: "/meals-details/:id",
        element: (
          <PrivetRoute>
            <MealsDetails />
          </PrivetRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <PrivetRoute>
            <Order />
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <DashBoardLayout />
      </PrivetRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
path : 'my-order',
Component : MyOrder,
      },
      {
        path : "payment-history",
        Component : PaymentHistory,
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
