import { lazy } from "react";
import { createHashRouter, RouteObject } from "react-router-dom";

import { HomeFilled } from "@ant-design/icons";

import LayoutRoot from "@/views/_layouts/Root";

import LayoutBlankContainer from "@/views/_layouts/containers/Blank";
import LayoutDashboardContainer from "@/views/_layouts/containers/Dashboard";
import LayoutExDashboardContainer from "@/views/_layouts/containers/ExDashboard";

import Error403 from "@/views/_errors/403";
import Error404 from "@/views/_errors/404";
import Error500 from "@/views/_errors/500";
import ErrorBoundary from "@/views/_errors/ErrorBoundary";

const LazyLogin = lazy(() => import("@/views/Login"));

const LazyHome = lazy(() => import("@/views/dashboard/Home"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LayoutRoot />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <LayoutBlankContainer />,
        children: [{ index: true, element: <LazyLogin /> }],
      },
      // 专门外嵌的 path，无 menu
      {
        path: "/ex/dashboard",
        element: <LayoutExDashboardContainer />,
        children: [{ index: true, element: <LazyHome /> }],
      },
      {
        path: "/dashboard",
        element: <LayoutDashboardContainer />,
        children: [{ index: true, element: <LazyHome /> }],
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

export const dashboardMenus: IMenus[] = [
  { key: "/dashboard", label: "首页", icon: <HomeFilled /> },
];

export default createHashRouter(routes);
