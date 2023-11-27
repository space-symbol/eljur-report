import { ElectronAPI } from '@electron-toolkit/preload'
import { SaveDialogOptions } from "electron";

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      showSaveDialog: (content:string, options: SaveDialogOptions) => string
    }
  }
}
