import { Form } from "antd";
import React from "react";

export interface ISPageProps {
  pageNoName?: string;
  pageNoNameInitValue?: number;

  pageSizeName?: string;
  pageSizeNameInitValue?: number;
}

const SPage: React.FC<ISPageProps> = (props) => {
  return (
    <>
      <Form.Item
        hidden
        name={props.pageNoName || "pageNo"}
        initialValue={props.pageNoNameInitValue || 1}
      />
      <Form.Item
        hidden
        name={props.pageSizeName || "pageSize"}
        initialValue={props.pageSizeNameInitValue || 10}
      />
    </>
  );
};

export default SPage;
