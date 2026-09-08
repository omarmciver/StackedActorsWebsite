import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { PlayerProvider } from './player'
import { AccessProvider } from './access'
import './styles/app.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AccessProvider>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </AccessProvider>
    </BrowserRouter>
  </StrictMode>
)
