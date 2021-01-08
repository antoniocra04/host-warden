import { ipcRenderer } from 'electron'
import React from 'react'
const exec = require('child_process').exec;

import { Indicator } from './Indicator'
import { Stats } from './Stats'

interface IRow {
    ip: string
    id: string
    stats: Array<0 | 1>
    maxMinutes: number
}

export const Row: React.FC<IRow> = (props) => {
    const [hostState, setHostState] = React.useState<
        'pending' | 'disabled' | 'active'
    >('pending')
    const [rowStats, setRowStats] = React.useState<Array<0 | 1>>([])
    const intervalRef = React.useRef(null)

    const ping = (host: string) => {
        function process(error: string, stdOut: string) {
            console.log(stdOut.indexOf('Maximum'))
            if(stdOut.indexOf('Maximum') !== -1){
                setHostState('active')
                ipcRenderer.invoke('ADD_STATS', props.id, 1)
                setRowStats(ipcRenderer.sendSync('GET_STATS', props.id))  
            }else{
                setHostState('disabled')
                ipcRenderer.invoke('ADD_STATS', props.id, 0)
                setRowStats(ipcRenderer.sendSync('GET_STATS', props.id))
            }
        }

        exec(`ping ${host}`, process);
    }

    const removeRow = () => {
        ipcRenderer.invoke('REMOVE_ROW', props.id)
        ipcRenderer.send('GET_ALL_HOSTS')
        clearInterval(intervalRef.current)
    }

    React.useEffect(() => {
        ping(props.ip)

        intervalRef.current = setInterval(() => {
            ping(props.ip)
        }, 60000)

        setRowStats(ipcRenderer.sendSync('GET_STATS', props.id))
    }, [])

    return (
        <div className="table__row">
            <Indicator hostState={hostState} />
            <p onClick={removeRow} className="table__ip-text">
                {props.ip}
            </p>
            <Stats maxMinutes={props.maxMinutes} stats={rowStats} />
        </div>
    )
}
