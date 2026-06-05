import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { CaptainContext } from '../Context/CaptainContext'
import Loader from '../components/Loader'

const CaptainProtectedWrapper = ({ children }) => {

    const { captain, loading } = useContext(CaptainContext)

    if (loading) {
        return <Loader />
    }

    if (!captain) {
        return <Navigate to="/captain-login"  />
    }

    return children
}

export default CaptainProtectedWrapper