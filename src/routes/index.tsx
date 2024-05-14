import { ReactNode } from "react";

import { AppstoreFilled } from "@ant-design/icons";

import LayoutBlank from "@/views/_layouts/Blank";
import LayoutContainer from "@/views/_layouts/Container";

import NotFound from "@/views/Errors/404";

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
    title: "NotFound",
    path: "*",
    code: "NOTFOUND",
    element: <NotFound />,
  },
];

export default routes;
