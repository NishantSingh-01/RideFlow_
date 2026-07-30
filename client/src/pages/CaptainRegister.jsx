import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from "axios"
import { useContext } from 'react'
import { CaptainContext } from '../Context/CaptainContext'

const CaptainRegister = () => {
  const {captain,setCaptain}  = useContext(CaptainContext)
        
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [color, setColor] = useState("")
  const [plate, setPlate] = useState("")
  const [capacity, setCapacity] = useState("")
  const [vehicleType, setVehicleType] = useState("car")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      firstname: firstName,
      lastname: lastName,
      email,
      password,
      color,
      plate,
      capacity: Number(capacity),
      vehicle_type: vehicleType,
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/captain/register`,
        data
      )
      if (response.status === 201) {
        localStorage.setItem("Captaintoken", response.data.data.token)
        setCaptain(response.data.data.captain)
        navigate('/captain-home')
      }

      toast.success('Registration successful!')
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
      setColor("")
      setPlate("")
      setCapacity("")
      setVehicleType("car")



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
    <div className="h-screen w-screen scroll-auto flex justify-center mt-3 overflow-y-auto pb-24">
      <form
        onSubmit={submitHandler}
        className="p-4 rounded-lg shadow-md flex flex-col gap-4 w-[450px]"
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
              required
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-3 border rounded-md outline-none focus:border-blue-500 w-1/2"
              required
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

        <div className="font-medium mt-2">Vehicle Details</div>

        <div className="flex gap-2">
          <input
            required
            type="text"
            placeholder="Vehicle Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="p-3 border rounded-md outline-none focus:border-blue-500 w-1/2"
          />
          <input
            required
            type="text"
            placeholder="Vehicle Plate"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            className="p-3 border rounded-md outline-none focus:border-blue-500 w-1/2"
          />
        </div>

        <div className="flex gap-2">
          <input
            required
            type="number"
            min="1"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="p-3 border rounded-md outline-none focus:border-blue-500 w-1/2"
          />

          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value.toLowerCase())}
            className="p-3 border rounded-md outline-none focus:border-blue-500 w-1/2"
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black mt-4 text-white p-3 rounded-md hover:bg-gray-900 disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>

      </form>
    </div>
  )
}

export default CaptainRegister