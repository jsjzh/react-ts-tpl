import { Result } from "antd";
import React from "react";

const Error500: React.FC = () => {
  return (
    <Result status="500" title="500" subTitle="Sorry, something went wrong." />
  );
};

export default Error500;
