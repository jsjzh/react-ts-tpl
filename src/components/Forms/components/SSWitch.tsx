import React from "react";
import { Switch, Form } from "antd";
import { omit } from "ramda";
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

const _colProps = omit(["span"]);
const _formItemProps = omit(["name", "label"]);
const _componentProps = omit(["onChange"]);

const SSWitch: React.FC<ISSWitchProps> = (props) => {
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
        <Switch
          onChange={props.onChange}
          {..._componentProps(props.componentProps)}
        />
      </Form.Item>
    </SCol>
  );
};

export default SSWitch;
