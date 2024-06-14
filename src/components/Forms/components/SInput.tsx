import SCol from "@/components/SCol";
import { Form, Input } from "antd";
import React from "react";

import type { SColProps } from "@/components/SCol";
import type { ColProps, FormItemProps, InputProps } from "antd";
import type { NamePath } from "antd/es/form/interface";

export interface ISInputProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: Omit<ColProps, "size" | "span">;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  onChange?: InputProps["onChange"];
  componentProps?: Omit<InputProps, "onChange">;
}

const SInput: React.FC<ISInputProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item name={props.name} label={props.label} {...props.formItemProps}>
        <Input
          style={{ width: "100%" }}
          allowClear
          onChange={props.onChange}
          {...props.componentProps}
        />
      </Form.Item>
    </SCol>
  );
};

export default SInput;
