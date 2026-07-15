import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SocketContext } from '../Context/SocketContext'

const CaptainLogin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const socket = useContext(SocketContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      email,
      password,
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/captain/login`, data)
      if (response.status == 200) {

        localStorage.setItem("Captaintoken", response.data.data.token)
        // console.log(response.data.data.captain.id)
     
        navigate("/captain-home")

        toast.success('Captain Login successful!')

        setEmail("")
        setPassword("")
      }
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        toast.error(error.response.data.message);
      } else if (error.request) {
        console.log("No response received:", error.request);
        toast.error("Server is not responding.");
      } else {
        console.log("Error:", error.message);
        toast.error(error.message);
      }
    }
    finally {
      setLoading(false)
    }


  }

  return (
    <div className="h-screen w-screen flex justify-center">
      <form
        onSubmit={submitHandler}
        className="p-8 rounded-lg shadow-md flex flex-col gap-4 w-100"
      >
        <div className="font-mono text-lg font-bold">
          RideFlow
        </div>

        <label htmlFor="email" className="font-medium">
          Enter Captain's Email
        </label>

        <input
          id="email" required
          type="email"
          value={email}
          onChange={(e) => setEmail(e .target.value)}
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
          Login
        </button>
        <p className='pl-2'>Create Account as Captain's <Link to='/captain-register' className='underline text-blue-400'>Sign up</Link></p>

        <div className="mt-auto mb-3">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full bg-green-600 text-white p-3 rounded-md"
          >
            Login as User
          </button>
        </div>
      </form>
    </div>
  )
}

export default CaptainLogin