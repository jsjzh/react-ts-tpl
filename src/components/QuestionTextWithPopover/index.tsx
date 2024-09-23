import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { TooltipPlacement } from "antd/es/tooltip";
import React from "react";

interface IProps {
  info: React.ReactNode;
  text?: React.ReactNode;
  infoPosition?: TooltipPlacement;
}

export default (props: IProps) => {
  return (
    <>
      {props.text}
      <Popover content={props.info}>
        &nbsp;
        <QuestionCircleOutlined />
      </Popover>
    </>
  );
};
