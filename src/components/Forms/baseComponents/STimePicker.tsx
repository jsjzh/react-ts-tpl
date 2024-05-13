import React from "react";
import { TimePicker, Form } from "antd";
import { omit } from "ramda";
import SCol from "@/components/SCol";

import type { ColProps, FormItemProps, TimePickerProps } from "antd";
import type { NamePath } from "antd/es/form/interface";
import type { SColProps } from "@/components/SCol";

export interface ITimePickerProps {
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

const _colProps = omit(["span"]);
const _formItemProps = omit(["name", "label"]);
const _componentProps = omit(["picker", "disabledDate", "onChange"]);

const STimePicker: React.FC<ITimePickerProps> = (props) => {
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
        <TimePicker
          style={{ width: "100%" }}
          allowClear
          disabledDate={props.disabledDate}
          onChange={props.onChange}
          {..._componentProps(props.componentProps)}
        />
      </Form.Item>
    </SCol>
  );
};

export default STimePicker;
