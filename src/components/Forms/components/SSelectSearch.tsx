import SCol from "@/components/SCol";
import { useDebounceFn } from "ahooks";
import { Form, Select } from "antd";
import React, { useEffect } from "react";

import type { SColProps } from "@/components/SCol";
import type { ColProps, FormItemProps, SelectProps } from "antd";
import type { NamePath } from "antd/es/form/interface";

export interface ISSelectSearchProps {
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
  componentProps?: Omit<SelectProps, "options" | "onSearch" | "onChange">;
}

const SSelectSearch: React.FC<ISSelectSearchProps> = (props) => {
  const _handleSearch = (value: string) =>
    props.onSearch && props.onSearch(value);

  const { run: handleSearch } = useDebounceFn(_handleSearch, { wait: 200 });

  useEffect(() => {
    props.searchOnInit && props.onSearch && props.onSearch("");
  }, []);

  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item name={props.name} label={props.label} {...props.formItemProps}>
        <Select
          style={{ width: "100%" }}
          allowClear
          showSearch
          optionFilterProp="label"
          options={props.options}
          onSearch={handleSearch}
          onChange={props.onChange}
          {...props.componentProps}
        />
      </Form.Item>
    </SCol>
  );
};

export default SSelectSearch;
