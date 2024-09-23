import { Form, FormInstance } from "antd";
import React from "react";

export interface withFormProps<T> {
  form: FormInstance<T>;
}

function withForm<T>(WrappedComponent: React.FC) {
  return function withFormComponent(props: any) {
    const [form] = Form.useForm<T>();

    return <WrappedComponent form={form} {...props} />;
  };
}

export default withForm;
