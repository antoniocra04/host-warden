import React from 'react'

import { calculateNumberOfRowsArray } from '../../utils/Functions'

interface ITimeLine {
    timeRatio: number
    timeSys: 'hr' | 'd' | 'm'
    numberOfRows: number
}

export const TimeLine: React.FC<ITimeLine> = (props) => {
    const [numberOfRows, setNumberOfRows] = React.useState([])

    const convertToEasyView = (time: number): string => {
        if (props.timeSys === 'hr' && time >= 24) {
            if (time % 24 !== 0) {
                return `${Math.round(time / 24)}d ${time % 24}hr`
            } else {
                return `${Math.round(time / 24)}d `
            }
        } else {
            return `${time}hr`
        }
    }

    React.useEffect(() => {
        setNumberOfRows(calculateNumberOfRowsArray(props.numberOfRows))
    }, [])

    return (
        <div className="time-line__container">
            {numberOfRows.map((number, index) => (
                <div key={index} className="time-line__time-block">
                    {convertToEasyView(number * props.timeRatio)}
                </div>
            ))}
        </div>
    )
}
