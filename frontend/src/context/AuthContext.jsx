/*
  src/context/AuthContext.jsx
  ============================
  Global authentication state management.

  WHY THIS FILE EXISTS:
  Multiple components need to know "is the user logged in?"
  Without context, you'd have to pass user/login/logout as props through
  every component in the tree — called "prop drilling", a known anti-pattern.

  React Context solves this: define state once here, access it anywhere
  with useAuth().

  WHAT THIS PROVIDES:
    user          → the current user object (null if not logged in)
    login()       → call the login API and store the user
    register()    → call the register API and store the user
    logout()      → call the logout API and clear the user
    loading       → true while checking if a session exists on mount
    isAuthenticated → shorthand for !!user

  HOW SESSION RESTORE WORKS:
  On every page load/refresh, this component runs useEffect.
  It calls GET /auth/me. If the HttpOnly cookie is still valid,
  the server returns the user and we restore the session silently.
  If the cookie is expired/missing, we get a 401 and set user = null.
  This happens BEFORE rendering the app (loading = true blocks render).
*/

import React from "react"
import { loginUser, registerUser, logoutUser, getCurrentUser } from "../api/authApi.js"

/*
  createContext(null) creates the context with a default value of null.
  The default only matters if useAuth() is called outside of AuthProvider —
  which would be a bug. We throw an error in useAuth() to catch that case.
*/
const AuthContext = React.createContext(null)

/*
  AuthProvider
  ─────────────
  Wrap your entire app in this component (done in main.jsx).
  It holds all auth state and exposes it via the context value.
*/
export const AuthProvider = ({ children }) => {

  /*
    user — the currently logged-in user object.
    Shape: { id, username, email, role, description, createdAt }
    null means no one is logged in.
  */
  const [user, setUser] = React.useState(null)

  /*
    loading — true while the initial session check is running.
    We show a spinner in App.jsx until this becomes false.
    This prevents a "flash" where the login form briefly appears
    before the session check completes on page reload.
  */
  const [loading, setLoading] = React.useState(true)

  /*
    Session restore on mount.
    Runs once when the app first loads.
    Calls GET /auth/me — if the cookie is valid, the server
    returns the user and we silently restore the session.
  */
  React.useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await getCurrentUser()
        // response.data is the user object from ApiResponse
        setUser(response.data)
      } catch {
        /*
          A 401 here is normal — it just means the user is not logged in.
          We don't log this error because it is expected behaviour.
        */
        setUser(null)
      } finally {
        /*
          Always set loading = false, whether the check succeeded or failed.
          This unblocks the UI render in App.jsx.
        */
        setLoading(false)
      }
    }

    restoreSession()
  }, [])

  /*
    login()
    ───────
    Calls the login API and stores the user in state.
    Called by Login.jsx handleSubmit.
    Throws on API error so Login.jsx can catch and show the message.
  */
  const login = async (credentials) => {
    const response = await loginUser(credentials)
    setUser(response.data)
    return response
  }

  /*
    register()
    ──────────
    Calls the register API and stores the new user in state.
    Called by Login.jsx handleSubmit (when in register mode).
    Throws on API error so Login.jsx can catch and show the message.
  */
  const register = async (credentials) => {
    const response = await registerUser(credentials)
    setUser(response.data)
    return response
  }

  /*
    logout()
    ────────
    Calls the logout API (which clears the cookie server-side),
    then sets user = null locally.
    App.jsx re-renders and shows the Login form.
  */
  const logout = async () => {
    try {
      await logoutUser()
    } finally {
      /*
        Always clear the local user state, even if the API call fails.
        This ensures the UI always reflects a logged-out state.
      */
      setUser(null)
    }
  }

  /*
    The value object is what every consumer of useAuth() receives.
    isAuthenticated is a derived boolean — !!user converts null → false,
    and any object → true.
  */
  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/*
  useAuth — the custom hook
  ─────────────────────────
  Any component that needs auth state imports and calls useAuth().

  Example usage:
    const { user, logout, isAuthenticated } = useAuth()

  The guard clause ensures it is never used outside of AuthProvider.
*/
export const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>. Check your main.jsx.")
  }

  return context
}

export default AuthContext
