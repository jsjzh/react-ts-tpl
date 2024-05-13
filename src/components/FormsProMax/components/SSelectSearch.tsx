import React from "react";
import { Form, Select } from "antd";
import { omit } from "ramda";
import { useDebounceFn } from "ahooks";

interface IProps {
  name: string;
  label: string;
  formItemProps?: Record<string, any>;
  componentProps?: {
    options?: { value: string | number; label: string | number }[];
    onSearch?: (value: string | number) => void;
    [k: string]: any;
  };
}

const SSelectSearch: React.FC<IProps> = (props) => {
  const _formItemProps = omit(["name"]);
  const _componentProps = omit(["options", "onSearch"]);

  const _handleSearch = (value: string | number) => {
    props.componentProps?.onSearch && props.componentProps?.onSearch(value);
  };

  const { run: handleSearch } = useDebounceFn(_handleSearch, { wait: 200 });

  return (
    <Form.Item
      name={props.name}
      label={props.label}
      {..._formItemProps(props.formItemProps)}
    >
      <Select
        showSearch
        optionFilterProp="label"
        style={{ width: "100%" }}
        options={props.componentProps?.options || []}
        onSearch={handleSearch}
        {...{ allowClear: true, ..._componentProps(props.componentProps) }}
      />
    </Form.Item>
  );
};

export default SSelectSearch;
