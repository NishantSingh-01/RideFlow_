import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const submitHandler = async(e) => {
     e.preventDefault()
     try {
       navigate('/')
       toast.success('Login successful!')
       console.log("login succesfull")
         setEmail("")
    setPassword("") 
     } catch (error) {
      
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
          placeholder="example@gmail.com"
          className="p-3 border rounded-md outline-none focus:border-blue-500"
        />

        <label htmlFor="password" className="font-medium">
          Enter your Password
        </label>

        <input
          id="password" required
          type="password"
          placeholder="Your Password"
          className="p-3 border rounded-md outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="bg-black mt-6 text-white p-3 rounded-md hover:bg-gray-900"
        >
          Login
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