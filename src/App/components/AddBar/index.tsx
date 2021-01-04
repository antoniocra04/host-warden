import React from 'react'
import { ipcRenderer } from 'electron'

import { PlusButton } from './PlusButton'
import { Input } from './Input'

const AddBar: React.FC = () => {
    const [newHost, setNewHost] = React.useState('')

    const createNewHost = () => {
        ipcRenderer.invoke('CREATE_NEW_HOST', newHost)
        setTimeout(() => {
            ipcRenderer.send('GET_ALL_HOSTS')
        }, 0)
    }

    return (
        <div className="add-bar__container">
            <span className={'add-bar__button'} onClick={createNewHost}>
                <PlusButton />
            </span>
            <Input setValue={setNewHost} value={newHost} />
        </div>
    )
}

export default AddBar
