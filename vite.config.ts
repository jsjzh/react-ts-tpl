import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig((config) => {
  // config.mode
  // dev test staging prod

  return {
    base: "./",
    plugins: [react()],
    resolve: { alias: { "@": path.resolve("./src") } },
    build: {
      sourcemap: config.mode !== "prod",
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom", "react-router-dom"],
            "react-utils-vendor": [
              "zustand",
              "use-immer",
              "styled-components",
              "ahooks",
            ],
            "antd-vendor": ["antd", "@ant-design/icons", "@ant-design/cssinjs"],
            "request-vendor": ["axios", "jsonp", "query-string"],
            "utils-vendor": [
              "dayjs",
              "immer",
              "ramda",
              "decimal.js",
              "js-base64",
              "localforage",
            ],
          },
        },
      },
    },
  };
});
