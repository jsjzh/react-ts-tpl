import React from "react";
import { Form, TreeSelect } from "antd";
import { omit } from "ramda";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps, TreeSelectProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import type { SColProps } from "@/components/SCol";

export interface ISTreeSelectProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  treeData?: TreeSelectProps["treeData"];
  onChange?: TreeSelectProps["onChange"];
  componentProps?: Omit<TreeSelectProps, "treeData" | "onChange">;
}

const _colProps = omit(["span"]);
const _formItemProps = omit(["name", "label"]);
const _componentProps = omit(["treeData", "onChange"]);

const STreeSelect: React.FC<ISTreeSelectProps> = (props) => {
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
        <TreeSelect
          style={{ width: "100%" }}
          allowClear
          treeNodeFilterProp="title"
          treeData={props.treeData}
          onChange={props.onChange}
          {..._componentProps(props.componentProps)}
        />
      </Form.Item>
    </SCol>
  );
};

export default STreeSelect;
