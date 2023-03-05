import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'

import { AuthContext } from '../context'

const PrivateRoute = ({ children, ...rest }) => {
    // User's auth state
    const { user } = useContext(AuthContext)

    // If user is not logged it, redirect to login page
    return user ? <Outlet /> : <Navigate to="/auth/login" />
}

export default PrivateRoute;