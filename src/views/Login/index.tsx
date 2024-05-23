import React from "react";
import { useImmer } from "use-immer";
import PageWrapper from "@/components/PageWrapper";
import { Link } from "react-router-dom";

interface IProps {}

const Login: React.FC<IProps> = (props) => {
  return (
    <PageWrapper>
      <div>Login</div>
      <Link to="/dashboard/home" state={{ from: "login" }}>
        home
      </Link>
      <Link to="/dashboard/todo" state={{ from: "login" }}>
        todo
      </Link>
    </PageWrapper>
  );
};

export default Login;
