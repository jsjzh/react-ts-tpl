import SCol from "@/components/SCol";
import { Form, InputNumber } from "antd";
import React from "react";

import type { SColProps } from "@/components/SCol";
import type { ColProps, FormItemProps, InputNumberProps } from "antd";
import type { NamePath } from "antd/es/form/interface";

export interface ISInputNumberProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  onChange?: InputNumberProps["onChange"];
  componentProps?: Omit<InputNumberProps, "onChange">;
}

const SInputNumber: React.FC<ISInputNumberProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item name={props.name} label={props.label} {...props.formItemProps}>
        <InputNumber
          style={{ width: "100%" }}
          onChange={props.onChange}
          {...props.componentProps}
        />
      </Form.Item>
    </SCol>
  );
};

export default SInputNumber;
