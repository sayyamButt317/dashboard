import { createBrowserRouter, Navigate } from "react-router";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import AnalyticPage from "@/pages/Analytics";
import DashboardLayout from "./layouts/DashboardLayout";
import Authlayout from "./layouts/Authlayout";
import ProductsPage from "@/pages/Products";
import OrderPage from "@/pages/Order";
import CustomerPage from "@/pages/Customers";
import CreateProductPage from "@/pages/createProduct";


const router = createBrowserRouter([

  {
    path: '/',
    element: <Navigate to="/dashboard/home" />,
},
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {path: "order",
        element:<OrderPage/>,

      },
      {
        path:"customer",
        element:<CustomerPage/>,
      },
      {
        path: "analytic",
        element: <AnalyticPage />,
      },
      {
        path: 'products/create',
        element: <CreateProductPage/>,
      }
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
