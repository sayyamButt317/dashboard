import { createBrowserRouter, Navigate } from "react-router";
import HomePage from "@/pages/Admin/Home";
import LoginPage from "@/pages/Authentication/Login";
import RegisterPage from "@/pages/Authentication/Register";
import AnalyticPage from "@/pages/Admin/Analytics";
import DashboardLayout from "./layouts/DashboardLayout";
import Authlayout from "./layouts/Authlayout";
import ProductsPage from "@/pages/Admin/Products";
import OrderPage from "@/pages/Admin/Order";
import CustomerPage from "@/pages/Admin/Customers";
import CreateProductPage from "@/pages/Admin/createProduct";
import LandingPage from "@/pages/client/Landing";
import Cart from "@/pages/client/Cart";
import ProductDetails from "@/pages/client/ProductDetails";

const router = createBrowserRouter([

  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/productdetail",
    element: <ProductDetails />,
    children:[
      {
        path: ":id",
        element: <ProductDetails />,
      }
    ],
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
      {
        path: "order",
        element: <OrderPage />,

      },
      {
        path: "customer",
        element: <CustomerPage />,
      },
      {
        path: "analytic",
        element: <AnalyticPage />,
      },
      {
        path: 'products/create',
        element: <CreateProductPage />,
      }
    ],
  },

  {
    path: '/auth',
    element: <Authlayout />,
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
