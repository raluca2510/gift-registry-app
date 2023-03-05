import React, { useContext } from 'react'
import { AiOutlineDown } from 'react-icons/ai'

import { WishlistItemContext } from '../../context'
import './WishlistItemNarrow.css'

const WishlistItemNarrow = ({ item  }) => {

    const {  setFields, setRequestedItem, setShowItemContent, showItemContent } = useContext(WishlistItemContext)

    
    // When down arrow is clicked
    const handleItemContent = () => {
        setRequestedItem(item)

        setFields({
            title: item?.title,
            link: item?.link,
            price: item?.price,
            description: item?.description,
            image: item?.image
        })
        setShowItemContent(!showItemContent)
    }

  return (
    <div className='item-header'>
        <div className='item-image'>
            {item?.image 
            ? <img src={item?.image} alt={item?.title}></img>
            : <div className='image-placeholder'></div>
            }
            
        </div>

        <div className='item-title'>
            <p >{item?.title}</p>

            {/* Display website */}
            {item?.link
            &&   <a href={item?.link} className='item-website active' target='_blank' rel="noreferrer">website</a>
            }
        </div>


        <p className='item-price'>
            {/* {item?.price ? item?.price : } */}
            {item?.price || (item?.link && 'see site')  || 'N/A'}
        </p>
        <div className='item-dropdown' onClick={handleItemContent}>
            <AiOutlineDown />
        </div>
    </div>
  )
}

export default WishlistItemNarrow