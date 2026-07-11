import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

/*
  main.jsx
  ========
  Entry point of the React application.

  WHY AuthProvider WRAPS App:
  AuthProvider must be the outermost wrapper so that every component
  in the tree — including App and Login — can call useAuth().

  If AuthProvider were inside App, then App itself could not use useAuth().
  If it were not here at all, useAuth() would throw:
    "useAuth must be used inside <AuthProvider>"

  HIERARCHY:
    StrictMode        → development checks (double-renders, deprecated APIs)
      AuthProvider    → provides auth state to the entire tree
        App           → reads auth state and renders the correct screen
*/
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
