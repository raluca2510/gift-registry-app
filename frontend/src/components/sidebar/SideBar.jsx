import React, { useContext, useEffect, useState } from 'react'
import { FaGift } from 'react-icons/fa'
import { useWindowWidth } from '@react-hook/window-size/throttled'
import { RxHamburgerMenu } from 'react-icons/rx'

import { AuthContext } from '../../context'
import { Footer, SideBarContent, SideBarCTA } from '../'
import './SideBar.css'

const SideBar = () => {
  // Get name from context
  const { user } = useContext(AuthContext)
  const [showCollapsedMenu, setShowCollapedMenu] = useState(false)

  const onlyWidth = useWindowWidth()

  useEffect(() => {
    // when the width of the screen is less than breakpoint-lg
    if(user) {

      if(onlyWidth > '975' || (onlyWidth <= '975' && showCollapsedMenu)) {
        document.querySelector('.SideBarContent').style.display = 'block'
        document.querySelector('.Footer').style.display = 'flex'
      } else if(onlyWidth <= '975' && !showCollapsedMenu) {
        document.querySelector('.SideBarContent').style.display = 'none'
        document.querySelector('.Footer').style.display = 'none'
      }
    } else {
      if(onlyWidth > '992' || (onlyWidth <= '992' && showCollapsedMenu)) {
        document.querySelector('.SideBarCTA').style.display = 'flex'
        document.querySelector('.Footer').style.display = 'flex'
      } else if(onlyWidth <= '992' && !showCollapsedMenu) {
        document.querySelector('.SideBarCTA').style.display = 'none'
        document.querySelector('.Footer').style.display = 'none'

      }
    }
  }, [onlyWidth, showCollapsedMenu])

  useEffect(() => {setShowCollapedMenu(false)}, [user])

  return (
    <div className='SideBar'>
      <div className='logo'>
        <FaGift />
        <RxHamburgerMenu className='collapsed-menu' onClick={() => setShowCollapedMenu(!showCollapsedMenu)} />
      </div>

      {/* If user is logged in, show content */}
      {user ? <SideBarContent /> : <SideBarCTA />}

      <Footer />
    </div>
  )
}

export default SideBar