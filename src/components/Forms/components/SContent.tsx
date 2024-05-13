import React from "react";
import { Form } from "antd";
import { omit } from "ramda";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import type { SColProps } from "@/components/SCol";

export interface ISSelectProProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name?: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  content?: React.ReactNode;
}

const _colProps = omit(["span"]);
const _formItemProps = omit(["name", "label"]);

const SContent: React.FC<ISSelectProProps> = (props) => {
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
        {props.content}
      </Form.Item>
    </SCol>
  );
};

export default SContent;
