import React from 'react'

import './SideBarCTA.css'

const SideBarCTA = () => {
  return (
    <div className='SideBarCTA'>
        <p className='sidebarcta-title'>Login to access many useful features</p>
        <ul className='sidebarcta-group'>
            <li className='sidebarcta-list'>Create or join a group</li>
            <li className='sidebarcta-list'>Add any item in seconds</li>
            <li className='sidebarcta-list'>View your friends' wish lists</li>
        </ul>
    </div>
  )
}

export default SideBarCTA