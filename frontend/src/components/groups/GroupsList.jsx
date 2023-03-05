import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { GroupsContext } from '../../context'
import { Group, GroupsCTA } from '../'
import './GroupsList.css'

const Groups = () => {

  // Get groups from GroupsContext
  const { groups } = useContext(GroupsContext) 
  
  return (
    <>
      {groups.length === 0 
        ? 
        <GroupsCTA />
        :
        <div className='GroupsList'>
        {groups.map(group => (
          <NavLink to={`/groups/${group.id}`} key={group.id}>
            <Group id={group.id} />
          </NavLink>
          
        ))}
        </div>
      }
    </>  
  )
      
}

export default Groups