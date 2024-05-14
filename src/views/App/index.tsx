import React from "react";
import { useRoutes } from "react-router-dom";
import routes, { IRoute } from "@/routes";
import type { RouteObject } from "react-router-dom";

const parseRoutes = (routes: IRoute[]): RouteObject[] =>
  routes.map((route) => ({
    path: route.path,
    element: route.element,
    children:
      Array.isArray(route.children) && route.children.length
        ? parseRoutes(route.children)
        : undefined,
    hasErrorBoundary: true,
  }));

const App: React.FC = () => {
  return useRoutes(parseRoutes(routes));
};

export default App;
