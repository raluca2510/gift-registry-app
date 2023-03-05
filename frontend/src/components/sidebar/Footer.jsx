import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai'

import { AuthContext } from '../../context'
import './Footer.css'

const Footer = () => {

    const { user, logout } = useContext(AuthContext)

    return (
        <footer className='Footer'>
            {/* If user is logged in, display Profile and logout */}
            {user &&   
                    <p onClick={logout}>
                        <AiOutlineLogout />Logout
                    </p>
            }

            {/* If user not logged in, display Login */}
            {!user && 
                <NavLink to='/'>
                    <AiOutlineLogin />Login
                </NavLink> 
            }
        </footer> 
    )
}

export default Footer