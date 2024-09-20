import PageWrapper from "@/components/PageWrapper";
import React from "react";
import { Link } from "react-router-dom";

interface IProps {}

const Login: React.FC<IProps> = (props) => {
  return (
    <PageWrapper>
      <div>Login</div>
      <Link to="/dashboard" state={{ from: "login" }}>
        home
      </Link>
      <Link to="/dashboard/todo" state={{ from: "login" }}>
        todo
      </Link>
    </PageWrapper>
  );
};

export default Login;
