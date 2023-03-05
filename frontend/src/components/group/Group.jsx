import React, { useState, useEffect, useContext } from 'react'
import { BiGroup } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { FormInput, OkMessage, ErrorMessage } from '../'
import { AuthContext, GroupsContext } from '../../context'
import './Group.css'

const Group = ({ id }) => {
  const navigate = useNavigate()

  const[showKeyField, setShowKeyField] = useState(false)

  const { authTokens, user } = useContext(AuthContext)
  const { fetchGroups } = useContext(GroupsContext)

  const [group, setGroup] = useState([])
  const [inputKey, setInputKey] = useState('')

  const [okMessage, setOkMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Get group data
  const fetchGroup = async () => {
    try {
      const res = await fetch(`/api/groups/${id}/`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      
      const data = await res.json()

      if(res.ok) {
        setGroup(data)
      } else {
        throw Error(data)
      }
    
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if(id !== undefined) fetchGroup()
  }, [])

  // Check submitted key
  const handleJoinGroup = (e) => {
    
    if(!inputKey) {
      setErrorMessage('Key required.')
    }else if(inputKey !== group.key) {
      setErrorMessage('Wrong key.')
    } else if(inputKey === group.key) {
      updateGroup()
    }
  }

  // Add user to group
  const updateGroup = async () => {
    // push user to group
    group.users.push(user.id)
    try {
      const res = await fetch(`/api/groups/${group.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        },
        body: JSON.stringify({
          users: group.users
        })
      })

      const data = await res.json()

      if(res.ok) {
        setErrorMessage('')
        setOkMessage('Joined! You\'ll be redirected')

        // Reload user's groups and redirect to homepage
        fetchGroups()
        setTimeout(() => {
          navigate('/')
        }, 3000)
        
      } else {
        setErrorMessage(data.detail)
      }
    } catch(err) {
      console.log(err)
    }
  }

  return (
      <div className='Group' onClick={() => setShowKeyField(true)} style={{backgroundColor: showKeyField && 'var(--main-accent-color)' }}>

        {!showKeyField 
        &&
          <>
            <p className='group-label'>
              <BiGroup />
              Group
            </p>
            <p className='group-title'>{group?.title}</p>
            {group.users && 
              <p className='group-label'>No. users: {group?.users.length}</p>
            }
          </>
        }
        {showKeyField
        &&
          <div className='group-key'>
            <FormInput type='text' autoFocus={true} placeholder='Enter key' onChange={(e) => setInputKey(e.target.value)} />
            <FormInput type='button' value='Enter' id={group?.id} onClick={(e) => handleJoinGroup(e)} style={{ backgroundColor: 'var(--secondary-accent-color' }} />
            {okMessage && <OkMessage okMessage={okMessage} />}
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          </div>
        }
      </div>
  )
}

export default Group