import { createBrowserRouter } from "react-router";

import RootLayout from "../Layout/RootLayout/RootLayout";

import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Meals from "../Pages/Meals/Meals";

import PrivetRoute from "./PrivetRoute";

import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import MealsDetails from "../Pages/MealsDetails/MealsDetails";
import Order from "../Pages/Order/Order";
import AdminRoute from "./AdminRoute";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import MyOrder from "../Pages/Dashboard/MyOrder/MyOrder";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";

import Profile from "../Pages/Profile/Profile";
import MyReview from "../Pages/MyReview/MyReview";
import MyFavoriteMeals from "../Pages/MyFavoriteMeals/MyFavoriteMeals";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancled from "../Pages/Dashboard/Payment/PaymentCancled";
import ChefRoute from "../Routes/ChefRoute";

import ApproveChef from "../Pages/Dashboard/ApproveChef/ApproveChef";
import DashBoardLayout from "../Layout/DashboardLayout/DashBoardLayout";
import MyMeals from "../Pages/Dashboard/MyMeals/MyMeals";
import CreateMeals from "../Pages/Dashboard/CreateMeals/CreateMeals";
import RequestOrder from "../Pages/Dashboard/ReqestOrder/RequestOrder";
import About from "../Pages/About/About";

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

      {
        path: "/profile",
        element: (
          <PrivetRoute>
            <Profile />
          </PrivetRoute>
        ),
      },
      {
        path: "/about",
        Component: About,
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
        path: "my-order",
        Component: MyOrder,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancled",
        Component: PaymentCancled,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "review",
        element: (
          <PrivetRoute>
            <MyReview />
          </PrivetRoute>
        ),
      },
      {
        path: "favorite",
        element: (
          <PrivetRoute>
            <MyFavoriteMeals />
          </PrivetRoute>
        ),
      },

      {
        path: "approve-chef",
        element: (
          <AdminRoute>
            <ApproveChef />
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },
      {
        path: "request-order",
        element: (
          <ChefRoute>
            <RequestOrder />
          </ChefRoute>
        ),
      },
      {
        path : 'profile',
        element : <PrivetRoute>
          <Profile/>
        </PrivetRoute>
      },

      {
        path: "my-meals",
        element: (
          <ChefRoute>
            <MyMeals />
          </ChefRoute>
        ),
      },
      {
        path: "create-meals",
        element: (
          <ChefRoute>
            <CreateMeals />
          </ChefRoute>
        ),
      },
    ],
  },
]);

export default router;
