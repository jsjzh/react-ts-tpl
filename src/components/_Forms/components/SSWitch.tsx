import React from "react";
import { Switch, Form } from "antd";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps, SwitchProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import type { SColProps } from "@/components/SCol";

export interface ISSWitchProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  onChange?: SwitchProps["onChange"];
  componentProps?: Omit<SwitchProps, "onChange">;
}

const SSWitch: React.FC<ISSWitchProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item
        name={props.name}
        label={props.label}
        valuePropName="checked"
        {...props.formItemProps}
      >
        <Switch onChange={props.onChange} {...props.componentProps} />
      </Form.Item>
    </SCol>
  );
};

export default SSWitch;
