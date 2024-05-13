import React from "react";
import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";

interface IProps {
  state: number;
}

const StateTag: React.FC<IProps> = (props) => {
  if (props.state === 0) {
    return (
      <Tag icon={<MinusCircleOutlined />} color="default">
        已停用
      </Tag>
    );
  }

  if (props.state === 1) {
    return (
      <Tag icon={<CheckCircleOutlined />} color="success">
        已启动
      </Tag>
    );
  }

  return <Tag>no data</Tag>;
};

export default StateTag;
