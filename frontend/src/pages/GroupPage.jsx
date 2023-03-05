import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';

import { GroupPageContent, GroupPageHeader } from '../components'
import { GroupContext, WishlistContext } from '../context'
import './GeneralPage.css'

const GroupPage = () => {
  
  const { id } = useParams()

  const { fetchGroup, fetchUsers, fetchItems } = useContext(GroupContext)
  const { setShowWishlist } = useContext(WishlistContext)

  useEffect(() => {
    if(id !== undefined) {
      // fetch group
      fetchGroup(id)
      // fetch users
      fetchUsers()
      // fetch items
      fetchItems()
      // don't show wishlist of a user from previous group
      setShowWishlist(false)
    }
  }, [id])

  

  return (
    <main className='GeneralPage'>
      <GroupPageHeader />
      <GroupPageContent />
    </main>
  )
}

export default GroupPage