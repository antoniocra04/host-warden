import {addAllAvailableHosts, addAllLocalHosts} from './functions'
import {LOCAL_IP, mainWindow, db} from './index'

export const menuTemplate = [
    { 
        id: 'scan', 
        label: 'Scan',
        submenu: [
            {
                id: 'localNetwork',
                label: 'Local network',
                submenu:[
                    {
                        id: 'addAllHosts',
                        label: 'Add all hosts',
                        click(){
                            addAllLocalHosts(LOCAL_IP, db, mainWindow)
                        }
                    },
                    {
                        id: 'addOnlyAvailableHosts',
                        label: 'Add all available hosts',
                        click(){
                            addAllAvailableHosts(LOCAL_IP, db, mainWindow)
                        }
                    }
                ]
            }
        ]
    },
]