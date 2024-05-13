import React from "react";
import { Form, Input } from "antd";
import { omit } from "ramda";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import { PasswordProps } from "antd/es/input";
import type { SColProps } from "@/components/SCol";

export interface ISInputPasswordProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  componentProps?: PasswordProps;
}

const _colProps = omit(["span"]);
const _formItemProps = omit(["name", "label"]);
const _componentProps = omit([]);

const SInputPassword: React.FC<ISInputPasswordProps> = (props) => {
  return (
    <SCol
      size={props.size || "middle"}
      span={props.span}
      {..._colProps(props.colProps)}
    >
      <Form.Item
        name={props.name}
        label={props.label}
        {..._formItemProps(props.formItemProps)}
      >
        <Input.Password
          style={{ width: "100%" }}
          allowClear
          {..._componentProps(props.componentProps)}
        />
      </Form.Item>
    </SCol>
  );
};

export default SInputPassword;
