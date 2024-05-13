import React from "react";
import { DatePicker, Form } from "antd";
import { omit } from "ramda";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import type { RangePickerProps } from "antd/es/date-picker";
import type { SColProps } from "@/components/SCol";

export interface ISDateRangerProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  picker?: RangePickerProps["picker"];
  disabledDate?: RangePickerProps["disabledDate"];
  onChange?: RangePickerProps["onChange"];
  componentProps?: Omit<
    RangePickerProps,
    "picker" | "disabledDate" | "onChange"
  >;
}

const _colProps = omit(["span"]);
const _formItemProps = omit(["name", "label"]);
const _componentProps = omit(["picker", "disabledDate", "onChange"]);

const SDateRanger: React.FC<ISDateRangerProps> = (props) => {
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
        <DatePicker.RangePicker
          style={{ width: "100%" }}
          allowClear
          picker={props.picker}
          disabledDate={props.disabledDate}
          onChange={props.onChange}
          {..._componentProps(props.componentProps)}
        />
      </Form.Item>
    </SCol>
  );
};

export default SDateRanger;
