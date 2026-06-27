import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import UserContext from './Context/USerContext.jsx'
import CaptainProvider from './Context/CaptainContext.jsx'
import { RideProvider } from './Context/RideContext.jsx'
import SocketProvider from './Context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserContext>
        <CaptainProvider>
          <RideProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </RideProvider>
        </CaptainProvider>
      </UserContext>
    </BrowserRouter>
  </StrictMode>
)