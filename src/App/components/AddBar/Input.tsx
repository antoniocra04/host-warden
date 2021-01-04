import React from 'react'

interface IInput {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export const Input: React.FC<IInput> = (props) => {
    return (
        <input
            className={'add-bar__input'}
            type="text"
            placeholder="255.255.255.255"
            onChange={(event) => props.setValue(event.target.value)}
            value={props.value}
        />
    )
}
