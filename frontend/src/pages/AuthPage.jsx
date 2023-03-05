import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { LoginPage, RegisterPage } from '../pages'
import './AuthPage.css'

const AuthPage = () => {
    const navigate = useNavigate();
    const [authType, setAuthType] = useState('login')
    
    // Toggle between auth/login and auth/register
    const handleAuthType = () => {
        if(authType === 'login') {
            setAuthType('register')
            navigate('/auth/register')
        } else {
            setAuthType('login')
            navigate('/auth/login')
        }
    }

  return (
    <main className='AuthPage'>
        {authType === 'login' ? <LoginPage /> : <RegisterPage />}
        <p onClick={handleAuthType} className='authpage-cta'>
            {authType === 'login' ? 'Don\'t have an account? Register here.' : 'Already have an account? Login here.'}
        </p>
    </main>
  )
}

export default AuthPage