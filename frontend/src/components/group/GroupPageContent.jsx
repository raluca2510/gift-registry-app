import React, { useState, useContext, useEffect } from 'react'

import { WishlistItemContext, GroupContext } from '../../context'
import { AddNewWishlistItem, Members } from '../'
import './GroupPageContent.css'

const GroupPageContent = () => {
  const { group } = useContext(GroupContext)

  // Members section shows by default
  const [showMembers, setShowMembers] = useState(true)
  const [showNewItem, setShowNewItem] = useState(false)
  const { setFields, setRequestedItem, setReadOnly, setOkMessage, setErrorMessage, setShowItemContent } = useContext(WishlistItemContext)

  useEffect(() => {
    setShowMembers(true)
    setShowNewItem(false)
  }, [group])

  // Toggle between the sections when user clicks on section
  const handleSection = (e) => {
    const section = e.target.id

    if(section === 'members') {
      setShowNewItem(!showNewItem)
      setShowMembers(!showMembers)
      document.getElementById('members').classList.toggle('active')
      document.getElementById('add-item').classList.toggle('active')
    } else if(section === 'add-item') {
      setShowMembers(!showMembers)
      setShowNewItem(!showNewItem)
      document.getElementById('members').classList.toggle('active')
      document.getElementById('add-item').classList.toggle('active')
    }

    // Reset WishlistItemContext
    setRequestedItem(null)
    setFields({
      title: '',
      link: '',
      price: '',
      description: '',
      image: ''
    })
    setReadOnly(false)
    setOkMessage(null)
    setErrorMessage(null)
    setShowItemContent(false)
  }
  
  return (
   
    <div className='GroupPageContent'>
      <div className='content-header'>
        <p id='members' className='members-title active' onClick={(e) => handleSection(e)}>Members</p>
        <p id='add-item' className='add-item' onClick={(e) => handleSection(e)}>Add Item</p>
      </div>
     
    {showMembers && <Members />}
    {showNewItem && <AddNewWishlistItem />}
    </div>

  )
}

export default GroupPageContent
