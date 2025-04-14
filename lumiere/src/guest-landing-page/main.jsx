import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Guest from './Guest'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Guest />
  </StrictMode>,
)
