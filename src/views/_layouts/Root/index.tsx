import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const LayoutRoot: React.FC = () => {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};

export default LayoutRoot;
