import React, { useContext } from 'react'

import { WishlistItemContext } from '../../context'
import { WishlistItemContent, WishlistItemNarrow } from '../'
import './WishlistItem.css'

const WishlistItem = ({ item }) => {

    const { requestedItem, showItemContent } = useContext(WishlistItemContext)
    
    return (
        <li key={item.id} className='wishlist-item'>
            <WishlistItemNarrow item={ item } />

            {showItemContent && requestedItem?.id === item.id &&
            <WishlistItemContent />
            }
        </li>
    )
}

export default WishlistItem