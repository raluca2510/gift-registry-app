import React, { useState } from 'react'

import { FormInput, ErrorMessage } from '../components'
import './Login&RegisterPages.css'

const RegisterPage = () => {

  const [errorMessage, setErrorMessage] = useState(null)


  // When register form is submitted
  const handleRegister = (e) => {
    // Prevent page from reloading
    e.preventDefault()

    // Get submitted data
    const formUsername = e.target.username.value
    const formPassword = e.target.password.value
    const formConfirmPassword = e.target.confirm.value

    // Validate input
    if(!formUsername || !formPassword || !formConfirmPassword) {
      setErrorMessage('All input fields are required.')
      return
    }

    // Check pass match
    if(formPassword === formConfirmPassword) {
      // Attempt to register
      register(formUsername, formPassword)

      // setErrorMessage(null)
    } else {
      setErrorMessage('Passwords must match.')
      return
    }
  }

  const register = async (username, password) => {
    try {
      const res = await fetch('/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })

      const data = await res.json()

      if(!res.ok) {
        setErrorMessage(data.detail)
      }

    } catch(err) {
      console.log(err)
    }
  }


  return (
    <div className='RegisterPage'>
      <h1 className='login-title'>Welcome!</h1>
      <p className='login-subtitle'>Register an account</p>

      <form className='login-form' onSubmit={handleRegister}>
          
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        <FormInput type='text' name='username' placeholder='Enter username' required='required' />
        <FormInput type='password' name='password' placeholder='Enter password'  />
        <FormInput type='password' name='confirm' placeholder='Confirm password'  />
        <FormInput type='submit' value='Register' />
      </form>

    </div>
  )
}

export default RegisterPage