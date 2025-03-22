import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./Css/QrCode.css"
import QrCode from './Components/QrCode.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QrCode />
  </StrictMode>,
)
