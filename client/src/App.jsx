import { useState } from 'react'
import './App.css'
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
        <Route path='/captain-home' element={<CaptainProtectedWrapper>
          <CaptainHome />
        </CaptainProtectedWrapper>} />


      </Routes>
    </div>
  )
}

export default App
