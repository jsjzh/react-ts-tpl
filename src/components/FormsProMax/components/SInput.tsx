import React from "react";
import { Form, Input } from "antd";
import { omit } from "ramda";
import type { FormItemInputProps } from "antd/es/form/FormItemInput";

interface IProps {
  name: string;
  label: string;
  formItemProps?: FormItemInputProps;
  componentProps?: Record<string, any>;
}

const SInput: React.FC<IProps> = (props) => {
  const _formItemProps = omit(["name"]);
  const _componentProps = omit([]);

  return (
    <Form.Item
      name={props.name}
      label={props.label}
      rules={[{ type: "string", max: 128, message: "输入最大长度为 128 字符" }]}
      {..._formItemProps(props.formItemProps)}
    >
      <Input
        style={{ width: "100%" }}
        {...{ allowClear: true, ..._componentProps(props.componentProps) }}
      />
    </Form.Item>
  );
};

export default SInput;
