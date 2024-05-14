import React from "react";
import { DatePicker, Form } from "antd";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps, DatePickerProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import type { SColProps } from "@/components/SCol";

export interface ISDatePickerProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: Omit<ColProps, "size" | "span">;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  picker?: DatePickerProps["picker"];
  disabledDate?: DatePickerProps["disabledDate"];
  onChange?: DatePickerProps["onChange"];
  componentProps?: Omit<
    DatePickerProps,
    "picker" | "disabledDate" | "onChange"
  >;
}

const SDatePicker: React.FC<ISDatePickerProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item name={props.name} label={props.label} {...props.formItemProps}>
        <DatePicker
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

export default SDatePicker;
