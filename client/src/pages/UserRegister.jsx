import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserRegister = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      console.log({
        firstName,
        lastName,
        email,
        password
      })

      toast.success('Registration successful!')

      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")

      navigate('/')
    } catch (error) {
      toast.error('Registration failed')
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center mt-8">
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

        <label  htmlFor="email" className="font-medium">
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
          Register
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
      </form>
    </div>
  )
}

export default UserRegister