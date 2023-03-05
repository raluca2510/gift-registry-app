import React, { useContext } from 'react'

import { WishlistItemContext } from '../../context'
import { FormInput, ErrorMessage, OkMessage, WishlistItemForm } from '../'
import './WishlistItemContent.css'

const WishlistItemContent = () => {

  const { readOnly, okMessage, errorMessage, handleSubmit, requestedItem } = useContext(WishlistItemContext)

  return (
    <div className='item-content'>
      <p className='content-updated'>edited {Date(requestedItem?.created_at).slice(0,15)}</p>

      {/* Form */}
      <WishlistItemForm />
  
      {/* Buttons */}
      {!readOnly
      && 
        // <>
        <div className='content-buttons'>
          <FormInput type='button' value='Submit edit' id='edit-btn' onClick={(e) => handleSubmit(e)} style={{ backgroundColor: 'var(--secondary-accent-color)' }} />
          <FormInput type='button' value='Delete' id='delete-btn' onClick={(e) => handleSubmit(e)}/>
          <>
          {okMessage &&  <OkMessage okMessage={okMessage} />}
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          </>
        </div>
      }    
    </div>

  )
}

export default WishlistItemContent