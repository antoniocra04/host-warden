import { Tray, Menu } from 'electron'

export const calculateNumberOfRowsArray = (
    numberOfRows: number
): Array<number> => {
    let tempNumberOfRows: Array<number> = []
    for (let i = 1; i <= numberOfRows; i++) {
        tempNumberOfRows = [...tempNumberOfRows, i]
    }

    return tempNumberOfRows
}

export const createTray = (iconPath: any, mainWindow: any, app: any): any => {
    const appIcon = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show',
            click: function () {
                mainWindow.show()
            },
        },
        {
            label: 'Exit',
            click: function () {
                app.quit()
            },
        },
    ])

    appIcon.on('double-click', function (event) {
        mainWindow.show()
    })
    appIcon.setToolTip('Host Warden')
    appIcon.setContextMenu(contextMenu)
    return appIcon
}
