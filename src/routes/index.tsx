import { Footer, Header, Skeleton } from "@/components";
import BlankLayout from "@/layouts/BlankLayout";
import MainLayout from "@/layouts/MainLayout";
import UserLayout from "@/layouts/UserLayout";
import { createBrowserRouter, LoaderFunctionArgs } from "react-router-dom";
import {
  About,
  Entertainment,
  Support,
  Category,
  SignIn,
  Register,
  Home,
  NotFound,
  ErrorPage,
  ProductDetail,
  SearchResults,
  UserCenter,
  ShoppingCart,
} from "../pages";
import RequireAuth from "@/HOCS/RequireAuth";
import { loadProducts } from "@/helpers/loaders";

const router = createBrowserRouter([
  //根目录 "/"
  {
    path: "/",
    element: <MainLayout header={<Header />} footer={<Footer />} />,
    hydrateFallbackElement: <Skeleton />,
    children: [
      {
        index: true, //默认子路由
        element: <Home />,
      },
      {
        path: "categories/:category",
        element: <Category />,
        errorElement: <ErrorPage />,
      },
      { path: "about", element: <About />, errorElement: <ErrorPage /> },
      { path: "entertainment", element: <Entertainment /> },
      { path: "support", element: <Support />, errorElement: <ErrorPage /> },
      {
        path: "product-detail/:id", //product-detail/123
        element: <ProductDetail />,
        errorElement: <ErrorPage />,
        loader: async ({ params, request }: LoaderFunctionArgs) => {
          const productId = params.id;
          if (!productId) {
            throw new Response("为提供产品ID", {
              status: 400,
              statusText: "Bad Request",
            });
          }
          return await loadProducts(productId, request.signal);
        },
      },
      {
        path: "search",
        element: <SearchResults />,
        errorElement: <ErrorPage />,
      },
      { path: "/cart", element: <ShoppingCart /> },
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
  {
    path: "/user",
    element: (
      <RequireAuth>
        <UserLayout />
      </RequireAuth>
    ),
    children: [{ path: "", element: <UserCenter /> }],
  },
]);

export default router;
