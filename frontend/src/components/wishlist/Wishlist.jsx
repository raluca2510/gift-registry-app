import React, { useContext, useState, useEffect } from 'react'
import { AiOutlineLeft } from 'react-icons/ai'

import { WishlistContext } from '../../context'
import { ErrorMessage, WishlistItem } from '../'
import './Wishlist.css'


const Wishlist = () => {
    const { memberId, memberUsername, setShowWishlist, getMemberItems } = useContext(WishlistContext)

    const [memberItems, setMemberItems] = useState([])

    useEffect(() => {
        setMemberItems(getMemberItems())
    }, [memberId])

    return (
        <div className='Wishlist'>
            <h3 className='wishlist-title'>
                {/* Go back button */}
                <span onClick={() => setShowWishlist(false)}><AiOutlineLeft /></span>
                {memberUsername}'s Wishlist
            </h3>

            <ul className='wishlist-list'>
                {/* Display wishlist item */}
                {memberItems.length > 0 && memberItems.map(item => {
                    return <WishlistItem key={item.id} item={item}/>
                })}

                {/* If no items are found for the user, display message */}
                {memberItems.length === 0 && <ErrorMessage errorMessage={`${memberUsername} doesn't have any items in their wishlist yet!`} />}
            </ul>
        </div>
    )
}

export default Wishlist