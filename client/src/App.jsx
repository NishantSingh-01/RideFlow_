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
import HOme from './pages/Home';



function App() {

  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path='/' element={<HOme/>} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/register' element={<UserRegister />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-register' element={<CaptainRegister />} />
        <Route path='/captain-home' element={<CaptainProtectedWrapper>
          <CaptainHome />
        </CaptainProtectedWrapper>} />


         <Route path="/ride" element={<h1>Ride Page</h1>} />
      <Route path="/drive" element={<h1>Drive Page</h1>} />
      <Route path="/about" element={<h1>About Page</h1>} />
      <Route path="/service" element={<h1>Service Page</h1>} />
      <Route path="/help" element={<h1>Help Page</h1>} />
      <Route path="/help" element={<h1>Help Page</h1>} />


      </Routes>
    </div>
  )
}

export default App
