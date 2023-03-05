import React, { useContext } from 'react'

import { WishlistItemContext } from '../../context'
import { FormInput } from '../'
import './WishlistItemForm.css'

const WishlistItemForm = () => {
    const { fields, setFields, readOnly, requestedItem } = useContext(WishlistItemContext)

    return (
    <div className='WishlistItemForm'>
        <div className='content-title'>
        <p>Title</p>
        <textarea readOnly={readOnly} value={fields.title || ""} cols="2" rows="4" onChange={(e) => setFields({ ...fields, title: e.target.value})} />
      </div>
      <div className='content-website'>
        {requestedItem?.link || !readOnly
        ? 
          <>
          <p>Website</p>
            <FormInput type='text' className='website-link' readOnly={readOnly} value={fields.link} onChange={(e) => setFields({ ...fields, link: e.target.value})} style={{ width: '100%' }} />
          
          </>
        :
          <p>No website</p>
        }
      </div>

      <div className='content-price'>
        {/* When readOnly if off OR readOnly is on and price exists */}
        {(!readOnly || (readOnly && requestedItem?.price))
        &&
            <>
                <p>Price</p>
                <FormInput type='text' readOnly={readOnly} value={fields.price || ""} onChange={(e) => setFields({ ...fields, price: e.target.value})} style={{ width: '100%' }} maxLength='10' />
            </>
        }
        
        {/* Else when readOnly is on and price doesn't exist */}
        {readOnly && !requestedItem?.price && 
            (requestedItem?.link ? <p>See site</p> : <p>No price</p>)}
        
      </div>


      <div className='content-description'>
        {requestedItem?.description || !readOnly
        ? 
          <>
          <p>Description</p>
          <textarea readOnly={readOnly} value={fields.description || ""} cols="2" rows="7" onChange={(e) => setFields({ ...fields, description: e.target.value})} maxLength='250' />
          </>
        :
          <p>No description</p>
        }
      </div>

      
      
        <div className='content-image'>
          {!readOnly
          &&
            <>
            <p>Image URL</p>
            <FormInput type='text' value={fields.image || ""} onChange={(e) => setFields({ ...fields, image: e.target.value})} style={{ width: '100%' }} readOnly={readOnly} />
            </>
          }
          
          {requestedItem?.image && readOnly && <img src={requestedItem?.image} alt={requestedItem?.title}></img>}
        </div>
    </div>
  )
}

export default WishlistItemForm