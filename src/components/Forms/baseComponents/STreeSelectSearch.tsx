import React, { useEffect } from "react";
import { Form, TreeSelect } from "antd";
import { omit } from "ramda";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps, TreeSelectProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import { useDebounceFn } from "ahooks";
import type { SColProps } from "@/components/SCol";

export interface ISTreeSelectSearchProps {
  searchOnInit?: boolean;

  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  treeData?: TreeSelectProps["treeData"];
  onSearch?: TreeSelectProps["onSearch"];
  onChange?: TreeSelectProps["onChange"];
  componentProps?: Omit<TreeSelectProps, "treeData" | "onChange" | "onSearch">;
}

const _colProps = omit(["span"]);
const _formItemProps = omit(["name", "label"]);
const _componentProps = omit(["treeData", "onChange", "onSearch"]);

const STreeSelectSearch: React.FC<ISTreeSelectSearchProps> = (props) => {
  const _handleSearch = (value: string) =>
    props.onSearch && props.onSearch(value);

  const { run: handleSearch } = useDebounceFn(_handleSearch, { wait: 200 });

  useEffect(() => {
    props.searchOnInit && props.onSearch && props.onSearch("");
  }, []);

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
          showSearch
          treeNodeFilterProp="title"
          treeData={props.treeData}
          onSearch={handleSearch}
          onChange={props.onChange}
          {..._componentProps(props.componentProps)}
        />
      </Form.Item>
    </SCol>
  );
};

export default STreeSelectSearch;
