/// <reference types="vite/client" />
declare const __API__: string
interface ImportMetaEnv {
  readonly RENDERER_VITE_API_DEV_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
