import React, { useContext } from 'react'

import { ErrorMessage, FormInput } from '../components'
import { AuthContext } from '../context'
import './Login&RegisterPages.css'

const LoginPage = () => {
  // Get login function from context
  const { login, errorMessage } = useContext(AuthContext)

  return (
    <div className='LoginPage'>
      <h1 className='login-title'>Welcome!</h1>
      <p className='login-subtitle'>Login to continue. If you're only checking out the app, use credentials test/test</p>
        <form onSubmit={login} className='login-form'>
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <FormInput type='text' name='username' placeholder='Enter username' required='required' />
          <FormInput type='password' name='password' placeholder='Enter password' required='required' />
          <FormInput type='submit' value='Login' />
        </form>

    </div>
  )
}

export default LoginPage