import React from "react"
import Login from "./component/Login.jsx"
import { useAuth } from "./context/AuthContext.jsx"

/*
  App.jsx
  =======
  Root component. Reads auth state from AuthContext and decides
  which screen to render.

  THREE possible states:

  1. loading = true
     AuthContext is checking if a session exists (GET /auth/me).
     We show a spinner so the UI doesn't flash the login form
     before the check completes.

  2. isAuthenticated = true
     User is logged in. Show the protected app content.
     For now this is a simple welcome screen — will be replaced
     with a proper router and dashboard when react-router-dom is added.

  3. isAuthenticated = false
     No active session. Show the Login/Register form.
*/
function App() {
  const { user, logout, loading, isAuthenticated } = useAuth()

  /* ── Loading state — session check in progress ── */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-center">
          {/*
            CSS-only spinner.
            animate-spin rotates the div.
            border-t-transparent creates the "gap" that makes it look like a spinner.
          */}
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          <p className="mt-4 text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  /* ── Authenticated — show protected content ── */
  if (isAuthenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-900 px-6">

        {/* Background glow — same as login page for visual consistency */}
        <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[140px]" />

        <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl">

          {/* Branding */}
          <h1 className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
            TutorRoom
          </h1>

          {/* Success indicator */}
          <div className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/20">
            <svg className="h-7 w-7 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          {/* Welcome message — uses the actual username from the server */}
          <h2 className="mt-4 text-2xl font-bold text-white">
            Welcome, {user.username}!
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            You are signed in as <span className="font-medium text-cyan-300">{user.email}</span>
          </p>
          <p className="mt-1 text-xs text-gray-500 uppercase tracking-widest">
            Role: {user.role}
          </p>

          {/* Logout button */}
          <button
            id="logout-btn"
            onClick={logout}
            className="mt-8 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/30 active:scale-[0.98]"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  /* ── Not authenticated — show Login/Register form ── */
  return <Login />
}

export default App
