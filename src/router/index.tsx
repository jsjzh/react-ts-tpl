import { createBrowserRouter, RouteObject } from "react-router-dom";

import LayoutRoot from "@/views/_layouts/Root";
import LayoutBlank from "@/views/_layouts/Blank";
import LayoutContainer from "@/views/_layouts/Container";

import Error403 from "@/views/_errors/403";
import Error404 from "@/views/_errors/404";
import Error500 from "@/views/_errors/500";
import ErrorBoundary from "@/views/_errors/ErrorBoundary";

import Login from "@/views/Login";

import Home from "@/views/dashboard/Home";
import TodoList from "@/views/dashboard/todo/List";
import TodoDetail from "@/views/dashboard/todo/Detail";

export type IRoute = RouteObject & {
  title?: string;
  hidden?: boolean;
};

export const routes: IRoute[] = [
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
          { index: true, element: <Home /> },
          { path: "/dashboard/todo", element: <TodoList /> },
          { path: "/dashboard/todo/:id", element: <TodoDetail /> },
        ],
      },
      { path: "/403", element: <Error403 /> },
      { path: "/404", element: <Error404 /> },
      { path: "/500", element: <Error500 /> },
      { path: "*", element: <Error404 /> },
    ],
  },
];

export default createBrowserRouter(routes);
