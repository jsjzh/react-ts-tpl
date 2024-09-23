import SCol from "@/components/SCol";
import { DatePicker, Form } from "antd";
import React from "react";

import type { SColProps } from "@/components/SCol";
import type { ColProps, FormItemProps } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import type { NamePath } from "antd/es/form/interface";

export interface ISDateRangerProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: Omit<ColProps, "size" | "span">;

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

const SDateRanger: React.FC<ISDateRangerProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item name={props.name} label={props.label} {...props.formItemProps}>
        <DatePicker.RangePicker
          style={{ width: "100%" }}
          allowClear
          picker={props.picker}
          disabledDate={props.disabledDate}
          onChange={props.onChange}
          {...props.componentProps}
        />
      </Form.Item>
    </SCol>
  );
};

export default SDateRanger;
