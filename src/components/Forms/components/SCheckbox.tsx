import SCol from "@/components/SCol";
import { Checkbox, Form } from "antd";
import React, { ReactNode } from "react";

import type { SColProps } from "@/components/SCol";
import type { CheckboxProps, ColProps, FormItemProps } from "antd";
import type { NamePath } from "antd/es/form/interface";

export interface ISCheckboxProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: Omit<ColProps, "size" | "span">;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  onChange?: CheckboxProps["onChange"];
  componentProps?: Omit<CheckboxProps, "onChange">;

  children?: ReactNode;
}

const SCheckbox: React.FC<ISCheckboxProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item
        name={props.name}
        label={props.label}
        valuePropName="checked"
        {...props.formItemProps}
      >
        <Checkbox onChange={props.onChange} {...props.componentProps}>
          {props.children}
        </Checkbox>
      </Form.Item>
    </SCol>
  );
};

export default SCheckbox;
