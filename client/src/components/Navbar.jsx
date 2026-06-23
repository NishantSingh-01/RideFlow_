import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    const navLinks = [
        { name: 'Ride', path: '/' },
        { name: 'Drive', path: '/captain-register' },
        { name: 'About', path: '/about' },
    ]

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem('token')

                if (!token) return

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/auth/getuser`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                setUser(response.data.data)
            } catch (error) {
                console.log(error)
                localStorage.removeItem('token')
                setUser(null)
            }
        }

        getUser()
    }, [])

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token")

            await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            localStorage.removeItem("token")
            setUser(null)

            toast.success("Logged out successfully")
            navigate("/login")
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Logout failed"
            )
        }
    }

    const handleNavigation = (path) => {
        navigate(path)
        setIsOpen(false)
    }

    return (
        <>
            <div className='h-16 px-4 sm:px-6 lg:px-15 fixed top-0 left-0 w-full z-50 text-white flex justify-between items-center bg-black'>

                <div className='flex gap-6 items-center'>
                    <div
                        onClick={() => navigate('/')}
                        className='text-white text-xl font-medium flex items-center cursor-pointer'
                    >
                        RideFlow
                    </div>

                    <div className='hidden md:flex gap-6 items-center'>
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                onClick={() => handleNavigation(link.path)}
                                className='cursor-pointer hover:text-gray-300 transition-colors'
                            >
                                {link.name}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='hidden md:flex gap-5 items-center'>
                    {user ? (
                        <>
                            <button className='cursor-pointer text-lg  transition-colors'>Help</button>

                            <button
                                onClick={handleLogout}
                                className='p-2 px-4 bg-red-500 rounded-3xl cursor-pointer'
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button className='cursor-pointer text-lg  transition-colors'>Help</button>

                            <button
                                onClick={() => navigate('/login')}
                                className='cursor-pointer'
                            >
                                Log in
                            </button>

                            <button
                                onClick={() => navigate('/register')}
                                className='p-2 px-4 cursor-pointer font-normal bg-white text-black rounded-3xl'
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>

                <button
                    className='md:hidden cursor-pointer flex flex-col gap-1.5 justify-center items-center w-8 h-8'
                    onClick={() => setIsOpen(true)}
                    aria-label='Open menu'
                >
                    <span className='block w-6 h-0.5 bg-white'></span>
                    <span className='block w-6 h-0.5 bg-white'></span>
                    <span className='block w-6 h-0.5 bg-white'></span>
                </button>
            </div>

            {isOpen && (
                <div
                    className='fixed inset-0 bg-black/50 z-40 md:hidden'
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed top-0 right-0 h-screen w-64 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className='flex justify-between items-center h-16 px-5 border-b border-white/10'>
                    <span
                        onClick={() => handleNavigation('/')}
                        className='text-xl font-medium cursor-pointer'
                    >
                        RideFlow
                    </span>

                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label='Close menu'
                        className='cursor-pointer relative w-7 h-7'
                    >
                        <span className='absolute top-1/2 left-1/2 w-6 h-0.5 bg-white -translate-x-1/2 -translate-y-1/2 rotate-45'></span>
                        <span className='absolute top-1/2 left-1/2 w-6 h-0.5 bg-white -translate-x-1/2 -translate-y-1/2 -rotate-45'></span>
                    </button>
                </div>

                <div className='flex flex-col gap-6 p-6'>
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            onClick={() => handleNavigation(link.path)}
                            className='cursor-pointer text-lg hover:text-gray-300 transition-colors'
                        >
                            {link.name}
                        </div>
                    ))}

                    <hr className='border-white/10 my-2' />

                    {user ? (
                        <button
                            onClick={handleLogout}
                            className='p-2 bg-red-500 rounded-3xl'
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => handleNavigation('/login')}
                                className='cursor-pointer text-left text-lg'
                            >
                                Log in
                            </button>

                            <button
                                onClick={() => handleNavigation('/register')}
                                className='p-2 font-normal bg-white text-black rounded-3xl'
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar