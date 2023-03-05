import React from 'react'

import './Message.css'

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className='error message'>{errorMessage}</div>
  )
}

export default ErrorMessage