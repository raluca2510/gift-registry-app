import React from 'react'

import './FormInput.css'

const FormInput = ({ type, value, placeholder, style, name, id, required, onClick, onChange, maxLength, autoFocus, datasetUsername, className, readOnly }) => {
  return ( 
    <input 
        type={type} 
        name={name || ''} 
        id={id} 
        placeholder={placeholder || ''} 
        required={required || false} 
        value={value} 
        className={'form-input ' + className}
        onClick={onClick} 
        onChange={onChange} 
        maxLength={maxLength} 
        autoFocus={autoFocus}
        style={style} 
        dataset-username={datasetUsername} 
        readOnly={readOnly}
    />
  )
}

export default FormInput