import SCol from "@/components/SCol";
import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";

import type { SColProps } from "@/components/SCol";
import { useDebounceFn } from "ahooks";
import type { ColProps, FormItemProps, SelectProps } from "antd";
import type { NamePath } from "antd/es/form/interface";

export interface ISSelectSearchMultipleProps {
  searchOnInit?: boolean;
  addSelectAll?: boolean;

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

const ALL_LABEL = "全选";
const ALL_VALUE = "__ALL__";

const SSelectSearchMultiple: React.FC<ISSelectSearchMultipleProps> = (
  props,
) => {
  const [customValue, setCustomValue] = useState<(string | number)[]>([]);

  const customOptions = props.addSelectAll
    ? props.options?.length
      ? [{ label: ALL_LABEL, value: ALL_VALUE }, ...props.options]
      : []
    : [];

  const _handleSearch = (value: string) =>
    props.onSearch && props.onSearch(value);

  const { run: handleSearch } = useDebounceFn(_handleSearch, { wait: 200 });

  useEffect(() => {
    props.searchOnInit && props.onSearch && props.onSearch("");
  }, []);

  const customOnChange: SelectProps["onChange"] = (
    values: (string | number)[],
    option,
  ) => {
    if (!values.includes(ALL_VALUE)) {
      setCustomValue(values);
      props.onChange && props.onChange(values, option);
    } else {
      const _values = values.filter((item) => item !== ALL_VALUE);
      const optionsValues = props.options?.map((item) => item.value) || [];

      if (
        // 如果 options 中的所有可选项都在 customsValue 里
        // 则表示用户在全选的情况下又点了 全选
        // 这样就直接清空
        optionsValues.every((item) => _values.includes(item as number | string))
      ) {
        setCustomValue([]);
        props.onChange && props.onChange([], []);
      } else {
        // 如果过滤了 all 的长度不等于原始 options 的长度
        // 则表示用户在非全选的情况下又点了 全选
        // 这样就直接设置全选
        const currentValues =
          ((props.options || []).map((item) => item.value) as (
            | string
            | number
          )[]) || [];
        setCustomValue(currentValues);
        props.onChange && props.onChange(currentValues, option);
      }
    }
  };

  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item name={props.name} label={props.label} {...props.formItemProps}>
        {/* 这个 span 很重要，因为 Form.Item 是针对子元素进行的 value onChange 监听 */}
        {/* 如果直接写 Select，就会导致 customValue 和 customChange 失效 */}
        {/* 现在的方案等于说讨巧的规避了 form 的自动收集机制 */}
        {/* 但是对于 from 的校验 rules 就需要自定义了 */}
        <span>
          <Select
            style={{ width: "100%" }}
            allowClear
            showSearch
            optionFilterProp="label"
            mode="multiple"
            value={customValue}
            options={customOptions}
            onSearch={handleSearch}
            onChange={customOnChange}
            {...props.componentProps}
          />
        </span>
      </Form.Item>
    </SCol>
  );
};

export default SSelectSearchMultiple;
