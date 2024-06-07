import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import router from "./router";

import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

import "antd/dist/reset.css";
import "./index.less";

import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from "@ant-design/cssinjs";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

import { createAPI } from "@/shared/API";

const api = createAPI("http://local.dasouche-inc.net:8888/");

const formData = new FormData();

formData.append("username", "username");
formData.append("password", "password");

api.postForm("/update", formData).then((data) => {
  console.log(data);
});

root.render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
      <RouterProvider router={router} />
    </StyleProvider>
  </ConfigProvider>,
  // </React.StrictMode>,
);
