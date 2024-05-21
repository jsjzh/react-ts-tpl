import React from "react";
import { TimePicker, Form } from "antd";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps, TimePickerProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import type { SColProps } from "@/components/SCol";

export interface ISTimePickerProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: Omit<FormItemProps, "name" | "label">;

  disabledDate?: TimePickerProps["disabledDate"];
  onChange?: TimePickerProps["onChange"];
  componentProps?: Omit<
    TimePickerProps,
    "picker" | "disabledDate" | "onChange"
  >;
}

const STimePicker: React.FC<ISTimePickerProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item name={props.name} label={props.label} {...props.formItemProps}>
        <TimePicker
          style={{ width: "100%" }}
          allowClear
          disabledDate={props.disabledDate}
          onChange={props.onChange}
          {...props.componentProps}
        />
      </Form.Item>
    </SCol>
  );
};

export default STimePicker;
