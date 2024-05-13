import ReactDOM from "react-dom/client";
import { HashRouter, BrowserRouter, MemoryRouter } from "react-router-dom";

import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

import "antd/dist/reset.css";
import "./index.less";

import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from "@ant-design/cssinjs";

import App from "@/views/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <HashRouter>
    <ConfigProvider locale={zhCN}>
      <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
        <App />
      </StyleProvider>
    </ConfigProvider>
  </HashRouter>,
);
