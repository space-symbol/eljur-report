import { ElectronAPI } from '@electron-toolkit/preload'
import { SaveDialogOptions } from 'electron'
import { DatabaseProperties } from '../main/db'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      showSaveDialog: (content: string, options: SaveDialogOptions) => string
      checkDBConnection: (databaseProperties: DatabaseProperties) => Promise<boolean>
      insertReportIntoDB: (
        databaseProperties: DatabaseProperties,
        report: ReportResult
      ) => Promise<void>

    }
  }
}
