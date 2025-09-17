import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from "./AuthContext";
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
  </StrictMode>,
)
