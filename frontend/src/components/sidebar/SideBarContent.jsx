import React, { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiOutlinePlusCircle } from 'react-icons/ai'
import { MdPowerSettingsNew } from 'react-icons/md'

import { AuthContext, GroupsContext } from '../../context'
import './SideBarContent.css'

const SideBarContent = () => {
  // Get login tokens from AuthContext
  const { user } = useContext(AuthContext)

  const { fetchGroups, groups } = useContext(GroupsContext)

  // Get user groups
  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <div className='SideBarContent'>

      <div className='nav'>
          <NavLink to='/'>
              <AiOutlineHome /><span>Dashboard</span>
          </NavLink>
          <NavLink to='/create'>
              <MdPowerSettingsNew />Create Group
          </NavLink>
          <NavLink to='/join'>
              <AiOutlinePlusCircle />Join Group
          </NavLink>
          
      </div>

      <div className='sidebar-groups'>
        <ul className='sidebar-group admin-group'>
          <p className='sidebar-group-title'>Groups I started</p>

          {groups.map(group => (
            // If user is the admin of the group, display group
            (group.admin === user.id) &&
             (
                <NavLink to={`/groups/${group.id}`} key={group.id}>
                  <li className='sidebar-group-list'>{group.title}</li>
                </NavLink>
              )
          ))}
          
        </ul>
        <ul className='sidebar-group admin-group'>
          <p className='sidebar-group-title'>Groups I joined</p>

          {groups.map(group => (
            // If user is not the admin of the group, display group
            (group.admin !== user.id) && 
              (
                <NavLink to={`/groups/${group.id}`} key={group.id}>
                  <li className='sidebar-group-list'>{group.title}</li>
                </NavLink>
              )
          ))}
          
        </ul>
        </div>
    </div>
  )
}

export default SideBarContent