import React, { ReactNode } from "react";
import { Checkbox, Form } from "antd";
import { omit } from "ramda";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps, CheckboxProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import type { SColProps } from "@/components/SCol";

export interface ISCheckboxProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  componentProps?: CheckboxProps;

  children?: ReactNode;
}

const _colProps = omit(["span"]);
const _formItemProps = omit(["name", "label"]);
const _componentProps = omit([]);

const SCheckbox: React.FC<ISCheckboxProps> = (props) => {
  return (
    <SCol
      size={props.size || "middle"}
      span={props.span}
      {..._colProps(props.colProps)}
    >
      <Form.Item
        name={props.name}
        label={props.label}
        valuePropName="checked"
        {..._formItemProps(props.formItemProps)}
      >
        <Checkbox {..._componentProps(props.componentProps)}>
          {props.children}
        </Checkbox>
      </Form.Item>
    </SCol>
  );
};

export default SCheckbox;
