import SCol from "@/components/SCol";
import { Form, Select } from "antd";
import React from "react";

import type { SColProps } from "@/components/SCol";
import type { ColProps, FormItemProps, SelectProps } from "antd";
import type { NamePath } from "antd/es/form/interface";

export interface ISSelectProps {
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

const SSelect: React.FC<ISSelectProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item name={props.name} label={props.label} {...props.formItemProps}>
        <Select
          style={{ width: "100%" }}
          allowClear
          options={props.options}
          onChange={props.onChange}
          {...props.componentProps}
        />
      </Form.Item>
    </SCol>
  );
};

export default SSelect;
