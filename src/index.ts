import { app, BrowserWindow, ipcMain, Menu, nativeImage} from 'electron'
import { IHost } from './App/utils/Interfaces'
import { createTray } from './App/utils/Functions'
import {menuTemplate} from './menuTemplate'
import os from 'os'
import {addNewHost} from './functions'

// Get current ip adress
const networkInterfaces = os.networkInterfaces(); 
export const LOCAL_IP = networkInterfaces['Wi-Fi'][1].address

// Create db connection
const Datastore = require('nedb')
export const db = new Datastore({ filename: 'data.db', autoload: true })

declare const MAIN_WINDOW_WEBPACK_ENTRY: any

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    app.quit()
}

let tray: any = null

export let mainWindow: BrowserWindow = null

const createWindow = (): void => {
    mainWindow = new BrowserWindow({
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
    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)

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

ipcMain.handle('CREATE_NEW_HOST', (event, newHost: string) => {
    addNewHost(db, newHost)
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