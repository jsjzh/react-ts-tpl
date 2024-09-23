import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

interface IProps {
  text?: string;
  loading?: boolean;
  handleExport: () => void;
}

const ExportButton: React.FC<IProps> = (props) => {
  return (
    <Button
      size="small"
      type="link"
      icon={<DownloadOutlined />}
      loading={props.loading}
      onClick={props.handleExport}
    >
      {props.text || "导出"}
    </Button>
  );
};

export default ExportButton;
