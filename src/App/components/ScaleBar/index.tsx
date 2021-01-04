import React from 'react'

import { PlusMini } from '../icons/PlusMini'
import { Minus } from '../icons/Minus'

interface IScaleBar {
    scaleValue: number
    setScaleValue: React.Dispatch<React.SetStateAction<number>>
    maxScaleValue: number
    minScaleValue: number
}

const ScaleBar: React.FC<IScaleBar> = (props) => {
    const upScale = () => {
        if (props.scaleValue < props.maxScaleValue) {
            props.setScaleValue(props.scaleValue + 1)
        }
    }

    const downScale = () => {
        if (props.scaleValue > props.minScaleValue) {
            props.setScaleValue(props.scaleValue - 1)
        }
    }

    return (
        <div className="scale-bar__container">
            <p className="scale-bar__text">
                Timeline scale: {props.scaleValue}
            </p>
            <span className={'scale-bar__button'} onClick={upScale}>
                <PlusMini />
            </span>
            <span className={'scale-bar__button'} onClick={downScale}>
                <Minus />
            </span>
        </div>
    )
}

export default ScaleBar
