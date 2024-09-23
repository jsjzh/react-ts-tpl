import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Content: React.FC = () => (
  <div id="globalContentContainer">
    <Outlet />
  </div>
);

const LayoutExDashboardContainer: React.FC = () => (
  <Suspense>
    <Content />
  </Suspense>
);

export default LayoutExDashboardContainer;
