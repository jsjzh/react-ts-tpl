import React from "react";
import { Form, InputNumber } from "antd";
import { omit } from "ramda";

interface IProps {
  name: string;
  label: string;
  formItemProps?: Record<string, any>;
  componentProps?: Record<string, any>;
}

const SInputNumber: React.FC<IProps> = (props) => {
  const _formItemProps = omit(["name"]);
  const _componentProps = omit([]);

  return (
    <Form.Item
      name={props.name}
      label={props.label}
      {..._formItemProps(props.formItemProps)}
    >
      <InputNumber
        style={{ width: "100%" }}
        {..._componentProps(props.componentProps)}
      />
    </Form.Item>
  );
};

export default SInputNumber;
