/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
declare const __API__: string
declare type SVG = React.FunctionComponent<React.SVGAttributes<SVGElement>>
interface ImportMetaEnv {
  readonly RENDERER_VITE_API_VENDOR: string
  readonly RENDERER_VITE_API_OUT_FORMAT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
