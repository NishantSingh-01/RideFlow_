import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../Context/USerContext'

const UserLogin = () => {
  const { user, setUser } = useContext(AppContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      email,
      password,
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data)
    
      // console.log("User:", response.data.data.token)
      if (response.status === 200) {
        localStorage.setItem("token", response.data.data.token)
        setUser(response.data.data.user)
        navigate('/')
      }
      toast.success('Registration successful!')
      setEmail("")
      setPassword("")

    } catch (error) {
      console.error(error)
      toast.error(
        error.response?.data?.message || "login failed"
      )
    }
    finally {
      setLoading(false)
    }

  }
  return (
    <div className="h-screen w-screen flex justify-center ">

      <form
        onSubmit={submitHandler}
        className=" p-8 rounded-lg shadow-md flex flex-col gap-4 w-100">
        <div className='font-mono text-lg font-bold'>RideFlow</div>
        <label htmlFor="email" className="font-medium">
          Enter your Email
        </label>

        <input
          id="email" required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
          className="p-3 border rounded-md outline-none focus:border-blue-500"
        />

        <label htmlFor="password" className="font-medium">
          Enter your Password
        </label>

        <input
          id="password" required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your Password"
          className="p-3 border rounded-md outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="bg-black mt-6 text-white p-3 rounded-md hover:bg-gray-900"
        >
          {loading ? "Loging......." : "Login"}
        </button>
        <p className='pl-2'>Create Account as User <Link to='/register' className='underline text-blue-400'>Sign up</Link></p>

        <div className="mt-auto mb-3">
          <button
            type="button"
            onClick={() => { navigate('/captain-login') }}
            className="w-full bg-orange-600 text-white p-3 rounded-md"
          >
            Login as Captain
          </button>
        </div>


      </form>
    </div>
  )
}

export default UserLogin