import React from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const LayoutRoot: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  console.log("location", location);
  console.log("params", params);

  return <Outlet />;
};

export default LayoutRoot;
