import React from 'react'
import './styles/main.scss'

import Mesh from './components/Mesh'
import Table from './components/Table'
import AddBar from './components/AddBar'
import ScaleBar from './components/ScaleBar'

const App: React.FC = () => {
    const [scaleValue, setScaleValue] = React.useState(1)

    return (
        <>
            <AddBar />
            <ScaleBar
                scaleValue={scaleValue}
                setScaleValue={setScaleValue}
                maxScaleValue={30}
                minScaleValue={1}
            />
            <Mesh timeRatio={scaleValue} />
            <Table maxMinutes={scaleValue * 8 * 60} />
        </>
    )
}

export default App
