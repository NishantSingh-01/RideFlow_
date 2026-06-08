import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import UserContext from './Context/USerContext.jsx'
import CaptainProvider from './Context/CaptainContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserContext>
        <CaptainProvider>
          <App />
        </CaptainProvider>
      </UserContext>
    </BrowserRouter>
  </StrictMode>
)