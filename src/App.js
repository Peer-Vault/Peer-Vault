import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./components/home/Welcome";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import UploadFile from "./components/file/UploadFile";
import DownloadFile from "./components/file/DownloadFile";
import ShareFile from "./components/file/ShareFile";
import UserInfo from "./components/user/UserInfo";
import Layout from "./pages/Layout";
import RegisterLayout from "./pages/RegisterLayout";
import Contact from "./components/contact/Contact";
import ContactLayout from "./pages/ContactLayout";
import LoginLayout from "./pages/LoginLayout";
import LogoutLayout from "./pages/LogoutLayout";
import Logout from "./components/auth/Logout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Welcome />,
        },
      ],
    },
    {
      path: "/user",
      children: [
        {
          path: "auth/register",
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          ),
        },
        {
          path: "auth/login",
          element: (
            <LoginLayout>
              <Login />
            </LoginLayout>
          ),
        },
        {
          path: "auth/logout",
          element: (
            <LogoutLayout>
              <Logout />
            </LogoutLayout>
          ),
        },
      ],
    },
    {
      path: "/user",
      children: [
        {
          path: "userinfo/getUserById",
          element: <UserInfo />,
        },
      ],
    },
    {
      path: "/file",
      children: [
        {
          path: "upload",
          element: <UploadFile />,
        },
        {
          path: "download/:hash",
          element: <DownloadFile />,
        },
        {
          path: "share",
          element: <ShareFile />,
        },
      ],
    },
    {
      path: "/contact-us",
      element: (
        <ContactLayout>
          <Contact />
        </ContactLayout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
