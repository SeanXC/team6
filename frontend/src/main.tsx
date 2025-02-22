import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router/router.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1034702981152-738t9gf9l7dp0br558c1odlmdo7g7t6r.apps.googleusercontent.com">
      <AppRouter />
    </GoogleOAuthProvider>
  </StrictMode>
)