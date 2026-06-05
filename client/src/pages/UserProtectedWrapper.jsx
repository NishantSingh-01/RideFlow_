import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '../Context/USerContext'
import Loader from '../components/Loader'

const UserProtectedWrapper = ({ children }) => {

    const { user, loading } = useContext(AppContext)

    if (loading) {
        return <Loader />
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default UserProtectedWrapper