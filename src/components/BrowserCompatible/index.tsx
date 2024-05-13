import React, { useEffect, useState } from "react";
import { Space } from "antd";
import {
  ChromeOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  Html5Outlined,
  IeOutlined,
} from "@ant-design/icons";
import { getUABrowserInfo } from "@/shared/utils";

interface IProps {}

const BrowserCompatible: React.FC<IProps> = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const { name, version } = getUABrowserInfo();
    const major = Number(version?.split(".")[0]);
    const whiteName = ["Chrome", "Firefox", "Edge"];
    if (!whiteName.includes(name!)) {
      setShow(true);
    } else {
      if (name === "Chrome" && major < 93) {
        setShow(true);
      }
      if (name === "Firefox" && major < 91) {
        setShow(true);
      }
      if (name === "Edge" && major < 93) {
        setShow(true);
      }
    }
  }, []);

  return (
    <div
      style={{
        display: show ? "block" : "none",
        padding: ".5rem",
        fontSize: "1rem",
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      <Space>
        <ExclamationCircleOutlined />
        <span>建议使用以下浏览器，以获得最佳体验：</span>
      </Space>

      <Space>
        <span>
          <ChromeOutlined /> Chrome93 + 以上版本
        </span>
        <span>
          <Html5Outlined /> FireFox91 + 以上版本
        </span>
        <span>
          <IeOutlined /> Edge93 + 以上版本
        </span>
      </Space>
      <CloseOutlined
        style={{ float: "right", cursor: "pointer" }}
        onClick={() => setShow(false)}
      />
    </div>
  );
};

export default BrowserCompatible;
