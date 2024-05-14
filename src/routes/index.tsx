import { ReactNode } from "react";

import { AppstoreFilled } from "@ant-design/icons";

import LayoutBlank from "@/views/_layouts/Blank";
import LayoutContainer from "@/views/_layouts/Container";

import Error403 from "@/views/_errors/403";
import Error404 from "@/views/_errors/404";
import Error500 from "@/views/_errors/500";

import Login from "@/views/Login";
import App from "@/views/App";

export interface IRoute {
  title: string;
  path: string;
  code: string;

  hide?: boolean;
  icon?: ReactNode;
  element?: ReactNode;
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    hide: true,
    title: "登录",
    path: "/",
    code: "LOGIN",
    element: <LayoutBlank />,
    children: [
      {
        title: "首页",
        path: "/login",
        code: "LOGIN",
        element: <Login />,
      },
    ],
  },
  {
    title: "首页",
    path: "/homepage",
    icon: <AppstoreFilled />,
    code: "HOMEPAGE",
    element: <LayoutContainer />,
    children: [
      {
        title: "首页",
        path: "/homepage/app",
        code: "APP",
        element: <App />,
      },
    ],
  },
  {
    hide: true,
    title: "ERROR403",
    path: "/403",
    code: "ERROR403",
    element: <Error403 />,
  },
  {
    hide: true,
    title: "ERROR404",
    path: "/404",
    code: "ERROR404",
    element: <Error404 />,
  },
  {
    hide: true,
    title: "ERROR500",
    path: "/500",
    code: "ERROR500",
    element: <Error500 />,
  },
  {
    hide: true,
    title: "ERROR403",
    path: "/*",
    code: "ERROR403",
    element: <Error403 />,
  },
];

export default routes;
