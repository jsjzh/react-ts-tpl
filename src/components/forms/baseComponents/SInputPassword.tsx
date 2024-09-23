import SCol from "@/components/SCol";
import { Form, Input } from "antd";
import React from "react";

import type { SColProps } from "@/components/SCol";
import type { ColProps, FormItemProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import { PasswordProps } from "antd/es/input";

export interface ISInputPasswordProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  onChange?: PasswordProps["onChange"];
  componentProps?: Omit<PasswordProps, "onChange">;
}

const SInputPassword: React.FC<ISInputPasswordProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item name={props.name} label={props.label} {...props.formItemProps}>
        <Input.Password
          style={{ width: "100%" }}
          allowClear
          onChange={props.onChange}
          {...props.componentProps}
        />
      </Form.Item>
    </SCol>
  );
};

export default SInputPassword;