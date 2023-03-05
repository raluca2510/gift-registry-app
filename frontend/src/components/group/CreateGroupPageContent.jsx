import React, { useContext, useState } from 'react'


import { FormInput, ErrorMessage, OkMessage } from '../'
import { AuthContext, GroupsContext } from '../../context'
import './CreateGroupPageContent.css'


const CreateGroupPageContent = () => {
    const { authTokens } = useContext(AuthContext)
    const { fetchGroups } = useContext(GroupsContext)

    const [titleInput, setTitleInput] = useState('')
    const [errorMessage ,setErrorMessage] = useState('')
    const [okMessage ,setOkMessage] = useState('')

    // Check title validity
    const handleCreateGroup = (e) => {
        if(titleInput.length === 0) {
            setErrorMessage('Title required.')
        } else {
            createGroup()
        }
    }

    // Create group
    const createGroup = async () => {
        try {
            const res = await fetch('/api/groups/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify({
                    title: titleInput
                })
            })

            const data = await res.json()

            if(res.ok) {
                setErrorMessage('')
                setTitleInput('')
                setOkMessage('Group successfully created.')
                fetchGroups()
            } else {
                setOkMessage('')
                setErrorMessage(data.detail)
            }
        }catch(err) {
            console.log(err)
        }
    }

    return (
    <div className='CreateGroupPageContent'>
        <FormInput type='text' placeholder='Enter group name' onChange={(e) => setTitleInput(e.target.value)} value={titleInput} maxLength='60' />

        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        {okMessage && <OkMessage okMessage={okMessage} />}
        {/* <FormInput */}
        <FormInput type='button' value='Create' onClick={(e) => handleCreateGroup(e)} />
    </div>
  )
}

export default CreateGroupPageContent