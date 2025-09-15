/// <reference types="vite/client" />

// (Optional) if you want to extend env types later:
interface ImportMetaEnv {
  // readonly VITE_API_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
