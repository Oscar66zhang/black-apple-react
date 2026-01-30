import { createBrowserRouter } from "react-router-dom";
import { Footer, Header } from "@/components";
import MainLayout from "@/layouts/MainLayout";
import BlankLayout from "@/layouts/BlankLayout";
import Home from "../pages/Home";
import {
  About,
  Computers,
  IPad,
  Entertainment,
  Support,
  Phones,
  SmartHome,
  SignIn,
  Register,
  NotFound,
  ErrorPage,
  ProductDetail,
} from "../pages";

const router = createBrowserRouter([
  //根目录 "/"
  {
    path: "/",
    element: <MainLayout header={<Header />} footer={<Footer />} />,
    children: [
      {
        index: true, //默认子路由
        element: <Home />,
      },
      { path: "about", element: <About />, errorElement: <ErrorPage /> },
      {
        path: "computer",
        element: <Computers />,
        errorElement: <ErrorPage />,
      },
      { path: "ipad", element: <IPad />, errorElement: <ErrorPage /> },
      { path: "entertainment", element: <Entertainment /> },
      { path: "support", element: <Support />, errorElement: <ErrorPage /> },
      {
        path: "smarthome",
        element: <SmartHome />,
        errorElement: <ErrorPage />,
      },
      { path: "phone", element: <Phones />, errorElement: <ErrorPage /> },
      {
        path: "product-detail/:id", //product-detail/123
        element: <ProductDetail />,
        errorElement: <ErrorPage />,
      },
      { path: "*", element: <NotFound />, errorElement: <ErrorPage /> },
    ],
  },
  //用户权限目录 "/auth"
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "signin", element: <SignIn />, errorElement: <ErrorPage /> },
      { path: "register", element: <Register />, errorElement: <ErrorPage /> },
    ],
  },
]);

export default router;
