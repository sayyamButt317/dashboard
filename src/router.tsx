import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import AnalyticPage from "@/pages/Analytics";
import DashboardLayout from "./layouts/DashboardLayout";
import Authlayout from "./layouts/Authlayout";


const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "analytic",
        element: <AnalyticPage />,
      },
    ],
  },

{
  path: '/auth',
  element:<Authlayout/>,
  children: [
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
  ],
},
]);

export default router;
