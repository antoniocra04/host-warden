import {BrowserWindow} from 'electron'
const exec = require('child_process').exec;

const getNetworkNumber = (ip: string) => {
    let i = 8
    let networkNumber = ''
    while(true){
        if(ip[i] !== '.'){
            networkNumber = networkNumber + ip[i]
        }else{
            break
        }

        i++
    }

    return networkNumber
}

export const addNewHost = (db: any, newHost: string) => {
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
}

export const addAllLocalHosts = async(localIp: string, db: any, mainWindow: BrowserWindow) => {

    const numberOfNetwork = getNetworkNumber(localIp)

    for(let i = 2; i <= 255; i++){
        addNewHost(db, `192.168.${numberOfNetwork}.${i}`)
    }
    mainWindow.webContents.send('FORCE_UPDATE_HOST_LIST')
}

export const addHostIfItAvailable = (ip: string, db: any, mainWindow: BrowserWindow) => {
    function process(error:string, stdOut: string) {
        if(stdOut.indexOf('TTL') !== -1){ 
            addNewHost(db, ip)
            mainWindow.webContents.send('FORCE_UPDATE_HOST_LIST')
        }
    }

    exec(`ping -n 1 ${ip}`, process)
}

export const addAllAvailableHosts = async (localIp: string, db: any, mainWindow: BrowserWindow) => {

    const numberOfNetwork = getNetworkNumber(localIp)

    for(let i = 1; i <= 255; i++){
        await addHostIfItAvailable(`192.168.${numberOfNetwork}.${i}`, db, mainWindow)
    }
}