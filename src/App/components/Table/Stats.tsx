import React from 'react'

import { IParseStats } from '../../utils/Interfaces'

interface IStats {
    maxMinutes: number
    stats: Array<0 | 1>
}

export const Stats: React.FC<IStats> = (props) => {
    const parseStatsData = (stats: Array<0 | 1>): Array<IParseStats> => {
        const parseStats: Array<IParseStats> = []
        let currentActivity = false
        let itterations = 0

        if (stats[stats.length - 1] !== 1) {
            currentActivity = true
        }

        if (stats.length - 1 <= props.maxMinutes) {
            itterations = 0
        } else {
            itterations = stats.length - props.maxMinutes - 1
        }

        for (let i = stats.length - 1; i >= itterations; i--) {
            if (
                (stats[i] === 1 && currentActivity === true) ||
                (stats[i] === 0 && currentActivity === false)
            ) {
                parseStats[0].time += 1
            } else if (stats[i] === 1 && currentActivity === false) {
                currentActivity = true
                parseStats.unshift({ activity: currentActivity, time: 1 })
            } else if (stats[i] === 0 && currentActivity === true) {
                currentActivity = false
                parseStats.unshift({ activity: currentActivity, time: 1 })
            }
        }

        return parseStats
    }

    return (
        <div className="table__stats-container">
            {parseStatsData(props.stats).map((block, index) => (
                <div
                    style={{
                        width: `${(100 / props.maxMinutes) * block.time}%`,
                        backgroundColor: block.activity ? '#4DE55C' : '#EB5A56',
                    }}
                    key={index}
                    className="table__stats-activity-block"
                ></div>
            ))}
        </div>
    )
}
