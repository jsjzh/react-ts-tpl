import SCol from "@/components/SCol";
import { Form, InputNumber, Space } from "antd";
import React from "react";

import type { SColProps } from "@/components/SCol";
import type { ColProps, InputNumberProps } from "antd";
import type { NamePath } from "antd/es/form/interface";

export interface ISInputNumberRangerProps {
  size?: SColProps["size"];
  span?: number;
  colProps?: ColProps;

  name: NamePath;
  range: [number, number];
  label?: React.ReactNode;

  componentPropss?: [InputNumberProps?, InputNumberProps?];
}

const SInputNumberRanger: React.FC<ISInputNumberRangerProps> = (props) => {
  return (
    <SCol size={props.size || "middle"} span={props.span} {...props.colProps}>
      <Form.Item
        name={`__${props.name}__`}
        label={props.label}
        required
        rules={[
          (form) => ({
            validator() {
              const first = form.getFieldValue([props.name, 0]);
              const second = form.getFieldValue([props.name, 1]);
              const rangeFirst = props.range[0];
              const rangeSecond = props.range[1];

              if (
                first < rangeFirst ||
                first > rangeSecond ||
                second < rangeFirst ||
                second > rangeSecond
              ) {
                return Promise.reject(
                  new Error(`可选值范围为 ${rangeFirst} ~ ${rangeSecond}`),
                );
              }

              if (first < second) {
                return Promise.resolve();
              } else {
                return Promise.reject(new Error("下限值必须小于上限值"));
              }
            },
          }),
        ]}
      >
        <Space>
          <Form.Item
            name={[props.name, 0]}
            noStyle
            rules={[{ required: true, message: "请输入最小值" }]}
          >
            <InputNumber
              keyboard={false}
              style={{ width: 150 }}
              precision={0}
              {...(props.componentPropss && props.componentPropss[0])}
            />
          </Form.Item>

          <span>-</span>

          <Form.Item
            name={[props.name, 1]}
            noStyle
            rules={[{ required: true, message: "请输入最大值" }]}
          >
            <InputNumber
              keyboard={false}
              style={{ width: 150 }}
              precision={0}
              {...(props.componentPropss && props.componentPropss[1])}
            />
          </Form.Item>
        </Space>
      </Form.Item>
    </SCol>
  );
};

export default SInputNumberRanger;