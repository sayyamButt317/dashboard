import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/Admin/Home";
import LoginPage from "@/pages/Authentication/Login";
import RegisterPage from "@/pages/Authentication/Register";
import AnalyticPage from "@/pages/Admin/Analytics";
import DashboardLayout from "./layouts/DashboardLayout";
import Authlayout from "./layouts/Authlayout";
import ProductsPage from "@/pages/Admin/Products";
import OrderPage from "@/pages/Admin/Order";
import CustomerPage from "@/pages/Admin/Customers";
import Productform from "@/pages/Admin/createProduct";
import LandingPage from "@/pages/client/Landing";
import Cart from "@/pages/client/Cart";
import ProductDetails from "@/pages/client/ProductDetails";
import Success from "@/pages/client/Success";
import Cancel from "./pages/client/Cancel";
import NotFound from "./pages/client/NotFound";
import EditProduct from "./pages/Admin/EditProduct";

const router = createBrowserRouter([

  { path: '/', element: <LandingPage />, },
  { path: "/cart", element: <Cart /> },
  { path: "/productdetail/:id", element: <ProductDetails />, },
  { path: "/success", element: <Success /> },
  { path: "/cancel", element: <Cancel /> },
  { path: "*", element: <NotFound /> },


  {
    path: "/dashboard", element: <DashboardLayout />,
    children: [

      { path: "home", element: <HomePage />, },
      { path: "product", element: <ProductsPage />,  },
      { path: "order", element: <OrderPage />, },

      { path: "customer", element: <CustomerPage />, },
      { path: "analytic", element: <AnalyticPage />, },
      { path: "product/create", element: <Productform />, },
      { path: "product/:id/edit", element: <EditProduct />, 
        
       },   // replace :id with the actual product id
  

    ],
  },
  // {
  //   path: 'product', element: <CreateProductPage />,
  //   children: [
  //     {
  //       path: ":id", element: <EditProduct />,  // replace :id with the actual product id
  //       children: [
  //         { path: "edit", element: <EditProduct /> }, // nested route
  //       ],
  //     }

  //   ],
  // },
  {
    path: '/auth', element: <Authlayout />,
    children: [
      { path: "login", element: <LoginPage />, },
      { path: "register", element: <RegisterPage />, },
    ],
  },
]);

export default router;
