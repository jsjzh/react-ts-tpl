import React from "react";
import { Form, Select } from "antd";
import { omit } from "ramda";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps, SelectProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import type { SColProps } from "@/components/SCol";

export interface ISSelectProProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  options?: SelectProps["options"];
  onChange?: SelectProps["onChange"];
  componentProps?: Omit<SelectProps, "options" | "onChange">;
}

const _colProps = omit(["span"]);
const _formItemProps = omit(["name", "label"]);
const _componentProps = omit(["options", "onChange"]);

const SSelectPro: React.FC<ISSelectProProps> = (props) => {
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
        <Select
          style={{ width: "100%" }}
          allowClear
          options={props.options}
          onChange={props.onChange}
          {..._componentProps(props.componentProps)}
        />
      </Form.Item>
    </SCol>
  );
};

export default SSelectPro;
