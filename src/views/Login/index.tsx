import PageWrapper from "@/components/PageWrapper";
import { Button, Tag } from "antd";
import queryString from "query-string";
import { pipe } from "ramda";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {}

const Login: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const jump = pipe(queryString.stringifyUrl as any, navigate);

  return (
    <PageWrapper>
      <div>
        {Object.keys(import.meta.env).map((key) => (
          <div key={key}>
            <Tag>{`${key} (type: ${typeof import.meta.env[key]})`}</Tag>
            <span>: {String(import.meta.env[key])}</span>
          </div>
        ))}
      </div>

      <Button
        type="primary"
        onClick={() => {
          jump({
            url: "/dashboard",
            query: { from: "login" },
          });
        }}
      >
        login
      </Button>
    </PageWrapper>
  );
};

export default Login;
