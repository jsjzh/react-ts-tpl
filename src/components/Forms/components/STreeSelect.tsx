import SCol from "@/components/SCol";
import { Form, TreeSelect } from "antd";
import React from "react";

import type { SColProps } from "@/components/SCol";
import type { ColProps, FormItemProps, TreeSelectProps } from "antd";
import type { NamePath } from "antd/es/form/interface";

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

const STreeSelect: React.FC<ISTreeSelectProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item name={props.name} label={props.label} {...props.formItemProps}>
        <TreeSelect
          style={{ width: "100%" }}
          allowClear
          treeNodeFilterProp="title"
          treeData={props.treeData}
          onChange={props.onChange}
          {...props.componentProps}
        />
      </Form.Item>
    </SCol>
  );
};

export default STreeSelect;
