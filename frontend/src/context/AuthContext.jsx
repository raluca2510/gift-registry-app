import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export default AuthContext;

export const AuthProvider = ({ children }) => {
    // Get access token from local storage
    let localStorageTokens = localStorage.getItem('authTokens')

    // State for auth tokens (access and refresh). Default value set to local storage tokens
    const [authTokens, setAuthTokens] = useState(() => localStorageTokens ? JSON.parse(localStorageTokens) : null)

    // State for user information (decoted from access token). Default value set to decoded data from local storage tokens
    const [user, setUser] = useState(() => localStorageTokens ? jwt_decode(localStorageTokens) : null)

    // Keep track if AuthProvider completed or not (is it still loading or not)
    // Default true when website first opened
    const [loading, setLoading] = useState(true)

    // Show error message if login fails
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()

    // Fetch login tokens from backend
    const login = async (e) => {
        // Prevent page refresh
        e.preventDefault()

        // Make sure fields are not null
        if(!e.target.username.value || !e.target.password.value) {
            setErrorMessage('All input fields are required.')
            return
        }

        // Try to log in user
        try {
            const res = await fetch('/user_auth/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Send auth data
                    'username': e.target.username.value,
                    'password': e.target.password.value
                })
            })
            
            const data = await res.json()

            // If response ok, set token
            if(res.ok) {
                // reset error message
                setErrorMessage('')
                
                // Set tokens to state
                setAuthTokens(data)

                // Decode data from access token and set it to user state
                setUser(jwt_decode(data.access))

                // Save tokens to local storage
                localStorage.setItem('authTokens', JSON.stringify(data))

                // Redirect user to homepage
                navigate('/')

            // If response not ok, throw error
            } else {
                setErrorMessage(data.detail)
                throw Error(data.detail)
            }
        } catch(err) {
            console.log(err)
        }
    }

    // Logout user
    const logout = () => {
        // Set tokens state to null
        setAuthTokens(null)

        // Set user state to null
        setUser(null)

        // Delete tokens to local storage
        localStorage.removeItem('authTokens')

        // Redirect user to login
        navigate('/')
    }

    // Update token
    const updateToken = async () => {
        console.log('update token called')
        // Try to update token
        try {
            const res = await fetch('/user_auth/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // If refresh token exists, send it from the authTokens state
                    'refresh': authTokens?.refresh
                })
            })
            
            const data = await res.json()

            // If response ok, update token to new token
            if(res.ok) {
                // Set tokens to state
                setAuthTokens(data)

                // Decode data from access token and set it to user state
                setUser(jwt_decode(data.access))

                // Save tokens to local storage
                localStorage.setItem('authTokens', JSON.stringify(data))

            // If response not ok, logout
            } else {
                // Logout user
                logout()

                // Display error to user
                // throw Error(data.detail)
            }
        } catch(err) {
            console.log(err)
        }

        // Once token is updated or user is logged out, set loading to false. Process completed.
        if(loading) {
            setLoading(false)
        }
    }

    // Updating the token
    useEffect(() => {
        // Update token each time website is opened
        if(loading) {
            updateToken()
        }
        // If token exists, update it every 4 minutes
        const timeInterval = 1000 * 60 * 4

        const intervalId = setInterval(() => {
            if(authTokens) {
                updateToken()
            }
        }, timeInterval)

        // Clear interval
        return () => clearInterval(intervalId)

    }, [authTokens, loading])


    const contextData = {
        // Variables
        user: user,
        authTokens: authTokens,
        errorMessage: errorMessage,

        // Functions
        login: login,
        logout: logout,
        updateToken:updateToken,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {/* Don't render children until AuthProvider is complete */}
            {loading ? null : children}
        </AuthContext.Provider>
    )

}