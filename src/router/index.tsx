/* eslint-disable @typescript-eslint/no-require-imports */
import { ReactNode } from "react";
import { createBrowserRouter, json, RouteObject } from "react-router-dom";

import LayoutRoot from "@/views/_layouts/Root";
import LayoutBlank from "@/views/_layouts/Blank";
import LayoutContainer from "@/views/_layouts/Container";

import Error403 from "@/views/_errors/403";
import Error404 from "@/views/_errors/404";
import Error500 from "@/views/_errors/500";
import ErrorBoundary from "@/views/_errors/ErrorBoundary";

// import Login from "@/views/Login";
import Homepage from "@/views/Home";

const LoginLazy = () => require("../views/Login").default;

export type IRoute = RouteObject & {
  title?: string;
  code?: string;
  hide?: boolean;
  icon?: ReactNode;
};

export const routes: IRoute[] = [
  {
    path: "/",
    element: <LayoutRoot />,
    errorElement: <ErrorBoundary />,
    loader: () => {
      return { rootData: "hello" };
    },
    children: [
      {
        path: "/",
        element: <LayoutBlank />,
        children: [
          {
            path: "/",
            // element: <Login />,
            lazy: () => import("@/views/Login"),
            loader: () => {
              return { loginData: "hello" };
            },
            // action: () => {
            //   throw json({ message: "email is required" }, { status: 401 });
            // },
          },
        ],
      },
      {
        path: "dashboard",
        element: <LayoutContainer />,
        children: [{ path: "home", element: <Homepage /> }],
      },
      { path: "403", element: <Error403 /> },
      { path: "404", element: <Error404 /> },
      { path: "500", element: <Error500 /> },
      { path: "*", element: <Error404 /> },
    ],
  },
];

export default createBrowserRouter(routes);
