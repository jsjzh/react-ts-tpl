import { lazy } from "react";
import { createHashRouter, RouteObject } from "react-router-dom";

import LayoutRoot from "@/views/_layouts/Root";
// import LayoutBlank from "@/views/_layouts/Blank";
import LayoutContainer from "@/views/_layouts/Container";

import Error403 from "@/views/_errors/403";
import Error404 from "@/views/_errors/404";
import Error500 from "@/views/_errors/500";
import ErrorBoundary from "@/views/_errors/ErrorBoundary";

import Login from "@/views/Login";

// import Home from "@/views/dashboard/Home";
// import Todo from "@/views/dashboard/todo";
import { HomeFilled, ToolFilled } from "@ant-design/icons";

const LazyHome = lazy(() => import("@/views/dashboard/Home"));
const LazyTodo = lazy(() => import("@/views/dashboard/todo"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LayoutRoot />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "/dashboard",
        element: <LayoutContainer />,
        children: [
          { index: true, element: <LazyHome /> },
          { path: "/dashboard/todo", element: <LazyTodo /> },
        ],
      },
      { path: "/403", element: <Error403 /> },
      { path: "/404", element: <Error404 /> },
      { path: "/500", element: <Error500 /> },
      { path: "*", element: <Error404 /> },
    ],
  },
];

export interface IMenus {
  key: string;
  label: string;
  hidden?: boolean;
  icon?: React.ReactNode;
  children?: IMenus[];
}

export const menus: IMenus[] = [
  { key: "/dashboard", label: "首页", icon: <HomeFilled /> },
  { key: "/dashboard/todo", label: "待办", icon: <ToolFilled /> },
];

export default createHashRouter(routes);
