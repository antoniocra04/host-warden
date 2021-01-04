import React from 'react'

export const Plus: React.FC = () => {
    return (
        <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="7" width="3" height="17" rx="1" fill="black" />
            <rect
                y="10"
                width="3"
                height="17"
                rx="1"
                transform="rotate(-90 0 10)"
                fill="black"
            />
        </svg>
    )
}
