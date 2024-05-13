import React from "react";
import { Checkbox, Form } from "antd";
import { omit } from "ramda";

interface IProps {
  name: string;
  label: string;
  formItemProps?: Record<string, any>;
  componentProps?: Record<string, any>;
}

const SCheckbox: React.FC<IProps> = (props) => {
  const _formItemProps = omit(["name"]);
  const _componentProps = omit([]);

  return (
    <Form.Item
      name={props.name}
      label={props.label}
      valuePropName="checked"
      {..._formItemProps(props.formItemProps)}
    >
      <Checkbox {...{ ..._componentProps(props.componentProps) }} />
    </Form.Item>
  );
};

export default SCheckbox;
