import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from "axios"
import { AppContext } from '../Context/USerContext'


const UserRegister = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { user, setUser } = useContext(AppContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      firstname: firstName,
      lastname: lastName,
      email,
      password,
    }
    try {

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data)
      console.log(response.data.data.user)
      
      if (response.status === 201) {
        localStorage.setItem("token", response.data.data.token)
        setUser(response.data.data.user)
        navigate('/')
      }

      toast.success('Registration successful!')
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")

    } catch (error) {
      console.error(error)
      toast.error(
        error.response?.data?.message || "Registration failed"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen scroll-auto flex justify-center mt-3">
      <form
        onSubmit={submitHandler}
        className="p-8 rounded-lg shadow-md flex flex-col gap-4 w-[450px]"
      >
        <div className="font-mono text-lg font-bold">
          RideFlow
        </div>

        <div>
          <label htmlFor="fullname" className="font-medium">
            Enter Your Name
          </label>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-3 border rounded-md outline-none focus:border-blue-500 w-1/2"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-3 border rounded-md outline-none focus:border-blue-500 w-1/2"
            />
          </div>
        </div>

        <label htmlFor="email" className="font-medium">
          Enter your Email
        </label>

        <input
          required
          id="email"
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border rounded-md outline-none focus:border-blue-500"
        />

        <label htmlFor="password" className="font-medium">
          Enter your Password
        </label>

        <input
          required
          id="password"
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border rounded-md outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="bg-black mt-4 text-white p-3 rounded-md hover:bg-gray-900"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 underline"
          >
            Login
          </Link>
        </p>
        <div className="fixed bottom-0 left-0 w-full bg-black text-white p-4 text-center">
          <p className="text-sm">
            By proceeding, you agree to RideFlow's Terms of Service and Privacy Policy.
          </p>
        </div>
      </form>
    </div>
  )
}

export default UserRegister