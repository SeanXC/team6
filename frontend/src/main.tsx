import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router/router.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="587809005861-c5b1tv9m8sr35uvaqi5osbjiemgd0ttb.apps.googleusercontent.com">
      <AppRouter />
    </GoogleOAuthProvider>
  </StrictMode>
)