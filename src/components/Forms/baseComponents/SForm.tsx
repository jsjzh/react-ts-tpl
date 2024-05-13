import React, { useCallback, useImperativeHandle } from "react";
import { Form, Row } from "antd";
import { equals, omit, pick } from "ramda";
import { useDebounceFn } from "ahooks";

import type { FormProps } from "antd";
import SRow from "@/components/SRow";

const omitChildren = omit(["children"]);

const getKey = (child: React.ReactNode) =>
  // @ts-ignore
  typeof child === "object" ? child.key : child;

export interface SFormRefs<T = Record<string, any>> {
  getValues: () => Partial<T>;
  validateValues: () => Promise<T>;
}

interface SFormOptions<T> {
  initialValues: T;
  debounceTime?: number;
}

export interface SFormProps<T = Record<string, any>>
  extends Omit<FormProps, "initialValues" | "onChange" | "children"> {
  onChange?: (values: T) => void;
  children?: React.ReactNode;

  formProps?: FormProps<T>;
}

const omitFormProps = omit([
  "form",
  "initialValues",
  "onValuesChange",
  "onChange",
  "formProps",
]);

// 有严重的 BUG 暂不能使用
const createSForm = <T extends Record<string, any>>(options: SFormOptions<T>) =>
  React.memo(
    React.forwardRef<SFormRefs<T>, SFormProps<T>>((props, ref) => {
      const form = props.form ? props.form : Form.useForm<T>()[0];

      useImperativeHandle(
        ref,
        () => ({
          getValues: () => pickValues(form.getFieldsValue()) as any,
          validateValues: () => form.validateFields(),
        }),
        [form],
      );

      const pickValues = useCallback(pick(Object.keys(options.initialValues)), [
        options.initialValues,
      ]);

      const _handleChange = () => {
        if (typeof props.onChange === "function") {
          props.onChange(pickValues(form.getFieldsValue()) as any);
        } else {
          console.log(pickValues(form.getFieldsValue()));
        }
      };

      const { run: handleChange } = useDebounceFn(_handleChange, {
        wait: options.debounceTime || 300,
      });

      const children = (
        Array.isArray(props.children) ? props.children : [props.children]
      )
        .filter((child) => !!child && child !== 0)
        .filter((child) => typeof child.$$typeof === "symbol");

      return (
        <Form
          form={form}
          initialValues={options.initialValues}
          onValuesChange={handleChange}
          {...omitFormProps(props)}
        >
          <SRow>{children}</SRow>
        </Form>
      );
    }),
    (pre, next) =>
      equals(omitChildren(pre), omitChildren(next)) &&
      equals(
        React.Children.toArray(pre.children).map(getKey),
        React.Children.toArray(next.children).map(getKey),
      ),
  );

export default createSForm;
