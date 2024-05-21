import React from "react";
import { Form, InputNumber } from "antd";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps, InputNumberProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import type { SColProps } from "@/components/SCol";

export interface ISInputNumberProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  componentProps?: InputNumberProps;
}

const SInputNumber: React.FC<ISInputNumberProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item name={props.name} label={props.label} {...props.formItemProps}>
        <InputNumber style={{ width: "100%" }} {...props.componentProps} />
      </Form.Item>
    </SCol>
  );
};

export default SInputNumber;
