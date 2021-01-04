import React from 'react'

import { Columns } from './Columns'
import { TimeLine } from './TimeLine'

interface IMesh {
    timeRatio: number
}

const Mesh: React.FC<IMesh> = (props) => {
    return (
        <>
            <Columns />
            <TimeLine
                timeRatio={props.timeRatio}
                timeSys={'hr'}
                numberOfRows={8}
            />
        </>
    )
}

export default Mesh
