import React from 'react'

interface IIndicator {
    hostState: 'active' | 'disabled' | 'pending'
}

export const Indicator: React.FC<IIndicator> = (props) => {
    const [indicatorColor, setIndicatorColor] = React.useState('')

    React.useEffect(() => {
        switch (props.hostState) {
            case 'active':
                setIndicatorColor('#4DE55C')
                break
            case 'disabled':
                setIndicatorColor('#EB5A56')
                break
            case 'pending':
                setIndicatorColor('#EBC156')
        }
    }, [props.hostState])

    return (
        <div
            style={{ backgroundColor: indicatorColor }}
            className="table__indicator"
        ></div>
    )
}
