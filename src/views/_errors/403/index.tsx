import { Result } from "antd";
import React from "react";

const Error403: React.FC = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
    />
  );
};

export default Error403;
