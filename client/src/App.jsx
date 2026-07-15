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
import EndRide from './pages/EndRide';
import ShareOtp from './pages/ShareOtp';
import Ride from './pages/Ride';



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
        <Route path="/end-ride" element={<CaptainProtectedWrapper><EndRide/></CaptainProtectedWrapper>} />
        <Route path="/shareOtp/:rideId" element={<UserProtectedWrapper><ShareOtp /></UserProtectedWrapper>} />
        <Route path="/Ride/:rideId" element={<Ride/>} />

        <Route path="/help" element={<h1>Help Page</h1>} />

      </Routes>
    </div>
  )
}

export default App
