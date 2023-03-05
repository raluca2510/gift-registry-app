import React, { useContext } from 'react'
import WishlistItemForm from './WishlistItemForm'

import { WishlistItemContext } from '../../context'
import { FormInput, OkMessage, ErrorMessage } from '../'
import './AddNewWishlistItem.css'

const AddNewWishlistItem = () => {
    const { okMessage, errorMessage, handleSubmit } = useContext(WishlistItemContext)

    return (
        <div className='AddNewWishlistItem'>
            {/* Form */}
            <WishlistItemForm />
    
        {/* Buttons */}
            <div className='create-button'>
                <FormInput type='button' value='Add item' id='create-btn' onClick={(e) => handleSubmit(e)}/>
                {okMessage && <OkMessage okMessage={okMessage} />}
                {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            </div>
        </div>
    )
}

export default AddNewWishlistItem