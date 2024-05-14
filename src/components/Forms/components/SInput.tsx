import React from "react";
import { Form, Input } from "antd";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps, InputProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import type { SColProps } from "@/components/SCol";

export interface ISInputProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: Omit<ColProps, "size" | "span">;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  componentProps?: InputProps;
}

const SInput: React.FC<ISInputProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item name={props.name} label={props.label} {...props.formItemProps}>
        <Input style={{ width: "100%" }} allowClear {...props.componentProps} />
      </Form.Item>
    </SCol>
  );
};

export default SInput;
