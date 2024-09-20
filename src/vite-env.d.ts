/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_HOST: string;
  readonly VITE_SKIP_AUTHENTICATION: "true" | "false";
}