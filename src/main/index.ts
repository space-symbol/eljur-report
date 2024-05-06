import { app, shell, BrowserWindow, SaveDialogOptions, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer'
import fs from 'fs'
import { Connection, ResultSetHeader } from 'mysql2'
import mysql from 'mysql2'
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: true,
    title: 'Элжур отчёты',
    autoHideMenuBar: true,
    icon: icon,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      devTools: is.dev
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.once('dom-ready', async () => {
      await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS], {
        loadExtensionOptions: { allowFileAccess: true },
        forceDownload: true
      })
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
    })
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        'Access-Control-Allow-Origin': ['*'],
        ...details.responseHeaders
      }
    })
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app`s specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle('dialog:saveDialog', async (_, content: string, options: SaveDialogOptions) => {
  const value = await dialog.showSaveDialog(options)
  const filepath = value?.filePath
  if (!filepath) {
    return
  }
  fs.writeFile(filepath, content, (err) => {
    if (err) {
      console.log(err)
    }
  })
})

const createInitalDB = (connection: Connection) => {
  const allGroups = `CREATE TABLE if not exists all_groups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
  ); 
  `
  const schedules = `CREATE TABLE if not exists schedules (
    id INT PRIMARY KEY AUTO_INCREMENT,
    group_id INT,
    date DATE,
    name VARCHAR(255),
    title VARCHAR(255),
    alert VARCHAR(255),
    FOREIGN KEY (group_id) REFERENCES all_groups(id)
  );
  `
  const schedule_items = `CREATE TABLE if not exists schedule_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    schedule_id INT,
    date DATE,
    room VARCHAR(255),
    name VARCHAR(255),
    teacher VARCHAR(255),
    sort INT,
    teacher_id INT,
    title VARCHAR(255),
    num VARCHAR(255),
    alert VARCHAR(255),
    FOREIGN KEY (schedule_id) REFERENCES schedules(id)
  );
  `

  return new Promise((resolve, reject) =>
    connection.query(allGroups, (err) => {
      if (err) {
        reject(err)
        return
      }
      connection.commit()
      connection.query(schedules, (err) => {
        if (err) {
          reject(err)
          return
        }
        connection.commit()
        connection.query(schedule_items, (err) => {
          if (err) {
            reject(err)
            return
          }
        })
        connection.commit()
        return resolve(true)
      })
    })
  )
}
ipcMain.handle('checkDatabaseConnection', async (_, databaseProperties: DatabaseProperties) => {
  const connection = mysql.createConnection({
    database: databaseProperties.database,
    host: databaseProperties.host,
    user: databaseProperties.user,
    password: databaseProperties.password,
    port: databaseProperties.port
  })
  return createInitalDB(connection).finally(() => connection.end())
})

ipcMain.handle(
  'insertReportIntoDB',
  async (_, databaseProperties: DatabaseProperties, reportResult: ReportResult) => {
    const connection = mysql.createConnection({
      ...databaseProperties
    })
    return insertDataToMySQL(connection, reportResult)
  }
)

const insertDataToMySQL = (connection: Connection, data: ReportResult) => {
  return new Promise((resolve) => {
    data.forEach((groupData) => {
      const groupName = Object.keys(groupData)[0]
      connection.query<ResultSetHeader>(
        `INSERT INTO all_groups (name) VALUES ('${groupName}')`,
        (err, result) => {
          if (err) throw err
          const groupId = result.insertId

          const scheduleData = groupData[groupName][0]
          const scheduleDate = Object.keys(scheduleData)[0]
          const { name, title, items, alert } = scheduleData[scheduleDate]

          connection.query<ResultSetHeader>(
            `INSERT INTO schedules (group_id, date, name, title, alert) VALUES (${groupId}, '${scheduleDate}', '${name}', '${title}', '${alert}')`,
            (err, result) => {
              if (err) throw err

              const scheduleId = result.insertId

              items.forEach((item) => {
                const { name, num, room, teacher, sort, teacher_id } = item
                connection.query(
                  `INSERT INTO schedule_items (schedule_id, name, num, room, teacher, sort, teacher_id) VALUES (${scheduleId}, '${name}', '${num}', '${room}', '${teacher}', ${sort}, ${teacher_id})`,
                  (err) => {
                    if (err) throw err
                  }
                )
              })
            }
          )
        }
      )
    })
    resolve('ok')
  })
}
