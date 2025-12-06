import { createBrowserRouter } from "react-router";

import RootLayout from "../Layout/RootLayout/RootLayout";

import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";




const router = createBrowserRouter([
  {
    path: "/",
    // element: <ErrorPage />,
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);

export default router;
