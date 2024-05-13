import React, { useEffect } from "react";
import { Form, Select } from "antd";
import { omit } from "ramda";
import { useDebounceFn } from "ahooks";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps, SelectProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import type { SColProps } from "@/components/SCol";

export interface ISSelectSearchProProps {
  searchOnInit?: boolean;

  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  options?: SelectProps["options"];
  onSearch?: SelectProps["onSearch"];
  onChange?: SelectProps["onChange"];
  componentProps?: Omit<SelectProps, "onSearch" | "options" | "onChange">;
}

const _colProps = omit(["span"]);
const _formItemProps = omit(["name", "label"]);
const _componentProps = omit(["onSearch", "options", "onChange"]);

const SSelectSearchPro: React.FC<ISSelectSearchProProps> = (props) => {
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
        <Select
          style={{ width: "100%" }}
          allowClear
          showSearch
          optionFilterProp="label"
          options={props.options}
          onSearch={handleSearch}
          onChange={props.onChange}
          {..._componentProps(props.componentProps)}
        />
      </Form.Item>
    </SCol>
  );
};

export default SSelectSearchPro;
