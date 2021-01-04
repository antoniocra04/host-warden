import React from 'react'
import { ipcRenderer } from 'electron'

import { IHost } from '../../utils/Interfaces'
import { Row } from './Row'

interface ITable {
    maxMinutes: number
}

const Table: React.FC<ITable> = (props) => {
    const [rows, setRows] = React.useState<Array<IHost>>(null)

    React.useEffect(() => {
        ipcRenderer.on('GET_ALL_HOSTS-reply', (event, args) => {
            setRows(args)
        })
        ipcRenderer.send('GET_ALL_HOSTS')
    }, [])

    return (
        <div className="table__container">
            {rows
                ? rows.map((host: IHost) => (
                      <Row
                          maxMinutes={props.maxMinutes}
                          id={host._id}
                          ip={host.ip}
                          key={host._id}
                          stats={host.stats}
                      />
                  ))
                : ''}
        </div>
    )
}

export default Table
