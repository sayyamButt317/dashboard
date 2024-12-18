import { createBrowserRouter } from "react-router";
import HomePage from '@/pages/Home.tsx';
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import AboutPage from "@/pages/About";
import ContactPage from "@/pages/Contact";

 const router = createBrowserRouter([
{
    path: "/",
    element: <HomePage/>,
    children: [
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
    ],

  },

  {
    path: 'Login',
    element: <LoginPage/>
  },
  {
    path: 'Register',
    element: <RegisterPage/>
  },
    
])

export default router;