import { Button, Tag } from "antd";
import queryString from "query-string";
import { pipe } from "ramda";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IProps {}

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

const Login: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const jump = pipe(queryString.stringifyUrl as any, navigate);

  return (
    <LoginContainer>
      <div>
        {Object.keys(import.meta.env).map((key) => (
          <div key={key}>
            <Tag>{`${key} (type: ${typeof import.meta.env[key]})`}</Tag>
            <span>: {String(import.meta.env[key])}</span>
          </div>
        ))}
      </div>

      <div>
        <Button
          type="link"
          onClick={() => {
            jump({ url: "/dashboard" });
          }}
        >
          login
        </Button>

        <Button
          type="link"
          onClick={() => {
            jump({ url: "/ex/dashboard" });
          }}
        >
          login ex
        </Button>
      </div>
    </LoginContainer>
  );
};

export default Login;
