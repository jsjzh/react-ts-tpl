import React from "react";
import { Form, Input } from "antd";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import type { TextAreaProps } from "antd/es/input";
import type { SColProps } from "@/components/SCol";

export interface ISTextAreaProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  onChange?: TextAreaProps["onChange"];
  componentProps?: Omit<TextAreaProps, "onChange">;
}

const STextArea: React.FC<ISTextAreaProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item name={props.name} label={props.label} {...props.formItemProps}>
        <Input.TextArea
          style={{ width: "100%" }}
          allowClear
          onChange={props.onChange}
          {...props.componentProps}
        />
      </Form.Item>
    </SCol>
  );
};

export default STextArea;
