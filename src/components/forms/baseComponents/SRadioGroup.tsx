import SCol from "@/components/SCol";
import { Form, Radio } from "antd";
import React from "react";

import type { SColProps } from "@/components/SCol";
import type { ColProps, FormItemProps, RadioGroupProps } from "antd";
import type { NamePath } from "antd/es/form/interface";

export interface ISRadioGroupProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  options?: RadioGroupProps["options"];
  onChange?: RadioGroupProps["onChange"];
  componentProps?: Omit<RadioGroupProps, "options" | "onChange">;
}

const SRadioGroup: React.FC<ISRadioGroupProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item name={props.name} label={props.label} {...props.formItemProps}>
        <Radio.Group
          options={props.options}
          onChange={props.onChange}
          {...props.componentProps}
        />
      </Form.Item>
    </SCol>
  );
};

export default SRadioGroup;