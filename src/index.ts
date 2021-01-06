import { app, BrowserWindow, ipcMain, nativeImage } from 'electron'
import { IHost } from './App/utils/Interfaces'
import { createTray } from './App/utils/Functions'

// Create db connection
const Datastore = require('nedb'),
    db = new Datastore({ filename: 'data.db', autoload: true })

declare const MAIN_WINDOW_WEBPACK_ENTRY: any

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    app.quit()
}

let tray: any = null

const createWindow = (): void => {
    const mainWindow = new BrowserWindow({
        height: 720,
        width: 1080,
        resizable: false,
        icon: 'favicon.png',
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
        },
    })

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
    // mainWindow.webContents.openDevTools();
    mainWindow.removeMenu()

    mainWindow.on('minimize', (event: Electron.Event) => {
        event.preventDefault()
        mainWindow.hide()
        tray = createTray(
            nativeImage.createFromPath('resources/favicon.png'),
            mainWindow,
            app
        )
    })

    mainWindow.on('restore', (event: any) => {
        mainWindow.show()
        tray.destroy()
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// DB ipcMain calls

ipcMain.handle('CREATE_NEW_HOST', (event, newHost: 'string') => {
    db.findOne({ ip: newHost }, (err: string, host: object) => {
        if (!host) {
            db.insert(
                { ip: newHost, stats: [] },
                (err: string, newDoc: any) => {
                    if (err) {
                        console.log(err)
                    }
                }
            )
        }
    })
})

ipcMain.on('GET_ALL_HOSTS', (event) => {
    db.find({}, (err: string, hosts: Array<IHost>) => {
        if (hosts) {
            event.reply('GET_ALL_HOSTS-reply', hosts)
        } else {
            console.log(err)
        }
    })
})

ipcMain.handle('REMOVE_ROW', (event, rowId) => {
    db.remove({ _id: rowId }, (err: string, numRemoved: number) => {
        console.log(numRemoved)
        if (err) {
            console.log(err)
        }
    })
})

ipcMain.handle('ADD_STATS', (event, _id: string, activity: number) => {
    db.update(
        { _id },
        { $push: { stats: activity } },
        {},
        (err: string, pushed: string) => {
            if (err) {
                console.log(err)
            }
        }
    )
})

ipcMain.on('GET_STATS', (event, rowId) => {
    db.findOne({ _id: rowId }, (err: string, host: any) => {
        if (host) {
            event.returnValue = host.stats
        } else {
            console.log(err)
        }
    })
})