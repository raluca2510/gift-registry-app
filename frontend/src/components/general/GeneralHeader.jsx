import React, { useContext } from 'react'

import { AuthContext } from '../../context'
import './GeneralHeader.css'

const GeneralHeader = ({ showHomePageHeader, showJoinGroupHeader, showCreateGroupHeader }) => {
    // Get user from AuthContext
    const { user } = useContext(AuthContext)
    
    return (
        <div className='Header'>
                {showHomePageHeader
                &&
                    <h1 className='header-heading'>Hello, {user.username}!</h1>
                }

                {showJoinGroupHeader
                &&
                    <>
                        <h1 className='header-heading'>Join a group</h1>
                        <p className='header-subtitle' style={{ justifyContent: 'center' }}>Search a group by title, then enter the key to join.</p>
                    </>
                }

                {showCreateGroupHeader
                &&
                    <>
                        <h1 className='header-heading'>Create a group</h1>
                        <p className='header-subtitle' style={{ justifyContent: 'center' }}>Enter your group's title to get started.</p>
                    </>
                }
        </div>
    )
}

export default GeneralHeader