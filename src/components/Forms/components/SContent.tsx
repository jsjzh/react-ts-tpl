import React from "react";
import { Form } from "antd";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import type { SColProps } from "@/components/SCol";

export interface ISContentProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: Omit<ColProps, "size" | "span">;

  name?: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  content?: React.ReactNode;
}

const SContent: React.FC<ISContentProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item name={props.name} label={props.label} {...props.formItemProps}>
        {props.content}
      </Form.Item>
    </SCol>
  );
};

export default SContent;
