import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { MdPowerSettingsNew } from 'react-icons/md'

import './GroupsCTA.css'

const GroupsCTA = () => {
    return (
        <div className='GroupsCTA'>
            <h3 className='groupscta-title'>Invite family & friends</h3>
            <p className='groupscta-subtitle'>Connect to at least one other person, through a group, to view and shop each other's lists in the same group.</p>
            <div className='groupscta-buttons'>
                    {/* Link to start group */}
                    <NavLink to='/create'>
                        <AiOutlinePlusCircle />Create Group
                    </NavLink>
                    {/* Link to join group */}
                    <NavLink to='/join'>
                        <MdPowerSettingsNew />Join Group
                    </NavLink>
            </div>
        </div>
    )
}

export default GroupsCTA