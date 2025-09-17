import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GameLibrary from './GameLibrary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameLibrary />
  </StrictMode>,
)
