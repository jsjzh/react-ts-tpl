import React from "react";
import { Tooltip, Typography } from "antd";

export default (props: { text: string }) => {
  return (
    <>
      <Typography.Text copyable={{ text: props.text }} />
      &nbsp;
      <Tooltip placement="topLeft" title={props.text}>
        {props.text}
      </Tooltip>
    </>
  );
};
