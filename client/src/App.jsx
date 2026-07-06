import { useState } from 'react'
import './App.css'
import 'leaflet/dist/leaflet.css';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import CaptainLogin from './pages/CaptainLogin'
import CaptainRegister from './pages/CaptainRegister'
import { ToastContainer } from "react-toastify";
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import UserHome from './pages/UserHome'
// import HOme from './pages/Home';
import About from './components/About';
import VehicleSelect from './pages/VehicleSelect';
import RequestRide from './pages/RequestRide';
import Arrived from './pages/Arrived'
import OtpVerify from './pages/OtpVerify'



function App() {

  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path='/' element={<UserProtectedWrapper><Home /></UserProtectedWrapper>} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/register' element={<UserRegister />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-register' element={<CaptainRegister />} />
        <Route path="/select-vehicle" element={<UserProtectedWrapper><VehicleSelect /></UserProtectedWrapper>} />
        <Route path="/request-ride" element={<RequestRide />} />
        <Route path='/captain-home' element={<CaptainProtectedWrapper><CaptainHome />        </CaptainProtectedWrapper>} />
        <Route path="/about" element={<About />} />
        <Route path="/captain-riding/:rideId" element={<CaptainProtectedWrapper><Arrived /></CaptainProtectedWrapper>} />
        <Route path="/otp-verify" element={<CaptainProtectedWrapper><OtpVerify /></CaptainProtectedWrapper>} />


        <Route path="/ride" element={<h1>Ride Page</h1>} />
        <Route path="/drive" element={<h1>Drive Page</h1>} />

        <Route path="/service" element={<h1>Service Page</h1>} />
        <Route path="/help" element={<h1>Help Page</h1>} />

      </Routes>
    </div>
  )
}

export default App
