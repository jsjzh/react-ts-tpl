import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

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
              "ahooks",
              "zustand",
              "use-immer",
              "styled-components",
            ],
            "antd-vendor": ["antd", "@ant-design/icons", "@ant-design/cssinjs"],
            "utils-vendor": [
              "jsonp",
              "dayjs",
              "immer",
              "ramda",
              "localforage",
              "query-string",
            ],
          },
        },
      },
    },
  };
});
