import React, { useState, useEffect, useContext } from 'react'

import { AuthContext, GroupContext } from '../../context'
import '../general/GeneralHeader.css'

const GroupPageHeader = () => {

  const { authTokens, user } = useContext(AuthContext)

  const { group, handleRemoveMember, handleDeleteGroup } = useContext(GroupContext)

  const [showCode, setShowCode] = useState(false)
  const [admin, setAdmin] = useState('')


  // Show code for 6 seconds, then hide
  const handleShowCode = (bool) => {
    setShowCode(bool)
    if(bool) {
      setTimeout(() => setShowCode(!bool), 6000)
    }
  }

  useEffect(() => {
    
    // Get admin username
    const fetchAdmin = async (userId) => {
    if(userId === undefined) return
    
    try {
      const res = await fetch (`/api/users/${userId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      
      const data = await res.json()
      
      if(res.ok) {
        setAdmin(data.username)
      } else {
        throw Error('Admin couldn\'t be fetched')
      }
      
    } catch(err) {
      console.log(err)
    }
  }
  if(group !== undefined) {
    fetchAdmin(group.admin)
  }
}, [group])


return (
  <div className='Header GroupPageHeader'>
      <h1 className='header-heading'>{group?.title}</h1>
      
      <div className='header-subtitle'>
        <div className='header-details'>
          <span>Admin: {admin}</span>
          <span>Created at: {Date(group?.created_at).slice(0,15)}</span>

          {/* if user is not admin, show option to exit group, else show option to delete group */}
          {group.admin !== user.id
          ?
            <span className='exit-group-btn' onClick={() => handleRemoveMember(user.id)}>Exit group</span>
          : <span className='exit-group-btn' onClick={() => handleDeleteGroup(user.id)}>Delete group</span>
          }
        </div>

        <div className='header-invite' onClick={() => handleShowCode(true)}>
            {showCode ?
            <input type='text' defaultValue={group?.key} className='invite-code' />
            :
            <p className='invite-message'>Invite more members!</p>
            }
        
          </div>
      </div>

      
    </div>
  )
}

export default GroupPageHeader