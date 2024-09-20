import PageWrapper from "@/components/PageWrapper";
import { Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";

interface IProps {}

const Login: React.FC<IProps> = (props) => {
  return (
    <PageWrapper>
      <div>
        {Object.keys(import.meta.env).map((key) => (
          <div key={key}>
            <Tag>{`${key} (type: ${typeof import.meta.env[key]})`}</Tag>
            <span>: {import.meta.env[key]}</span>
          </div>
        ))}
      </div>

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
