import React from "react"
import { useAuth } from "../context/AuthContext.jsx"

const Login = () => {

  /* ────────────────────────────────────────────────────────────
     Auth context — provides login() and register() functions.
     These call the real API and update global auth state.
     When either succeeds, App.jsx sees isAuthenticated = true
     and switches away from this Login screen.
  ──────────────────────────────────────────────────────────── */
  const { login, register } = useAuth()

  /* ============================================================
     STATE 1 — isRegister
     false = Login view  |  true = Register view
  ============================================================ */
  const [isRegister, setIsRegister] = React.useState(false)

  /* ============================================================
     STATE 2 — formData
     One object holds all input field values.
     Each key matches the "name" attribute on its input.
  ============================================================ */
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  /* ============================================================
     STATE 3 — errors
     Holds both frontend and backend field-level validation messages.
     Empty string = no error for that field.
  ============================================================ */
  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  /* ============================================================
     STATE 4 — isLoading (NEW)
     True while the API request is in flight.
     Disables the submit button to prevent double-submission.
  ============================================================ */
  const [isLoading, setIsLoading] = React.useState(false)

  /* ============================================================
     STATE 5 — serverError (NEW)
     General error message from the server that does not belong
     to a specific field. E.g. "Invalid email or password" (401),
     "Email already exists" (409), "Internal Server Error" (500).
     Displayed below the submit button.
  ============================================================ */
  const [serverError, setServerError] = React.useState("")

  /* ============================================================
     handleChange
     Single handler for all input fields.
     Updates the matching formData key using computed property names.
     Also clears that field's error as the user types.
  ============================================================ */
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))

    /*
      Also clear the general server error when the user starts
      typing again — they're attempting to fix the problem.
    */
    if (serverError) setServerError("")
  }

  /* ============================================================
     validate — frontend validation
     Runs BEFORE the API call to catch obvious mistakes early
     and save an unnecessary network round-trip.

     NOTE: Password minimum is 8 characters — matching the backend
     Zod schema in auth.dto.js. Previously it was 6.
  ============================================================ */
  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }

    if (isRegister && formData.name.trim() === "") {
      newErrors.name = "Username is required"
    } else if (isRegister && formData.name.trim().length < 3) {
      newErrors.name = "Username must be at least 3 characters"
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required"
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Please enter a valid email address"
    }

    if (formData.password === "") {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      /*
        8 characters — matches auth.dto.js backend validation.
        If you change this on the backend, change it here too.
      */
      newErrors.password = "Password must be at least 8 characters"
    }

    if (isRegister && formData.confirmPassword === "") {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (isRegister && formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some((msg) => msg !== "")
    return !hasErrors
  }

  /* ============================================================
     handleBackendErrors
     Parses the error response from the server and maps it to
     the appropriate state (field errors or general server error).

     TWO types of errors come back from the backend:

     TYPE 1 — Zod validation errors (status 400):
     {
       success: false,
       message: "Validation failed",
       errors: { username: ["too short"], email: ["invalid"] }
     }
     → Map these to the errors state so they appear beside the fields.

     TYPE 2 — General API errors (status 401, 409, 500):
     {
       success: false,
       message: "Email already exists",
       errors: []
     }
     → Display message in serverError state below the submit button.
  ============================================================ */
  const handleBackendErrors = (error) => {
    if (!error.response) {
      /*
        No response = network error (backend not running, no internet).
        This is NOT a 4xx/5xx — it's a failed request entirely.
      */
      setServerError("Cannot connect to server. Make sure the backend is running.")
      return
    }

    const { data } = error.response

    /*
      Check if errors is an object with field keys (Zod validation error).
      We check it's a plain object, not an array.
    */
    const hasFieldErrors =
      data.errors &&
      typeof data.errors === "object" &&
      !Array.isArray(data.errors) &&
      Object.keys(data.errors).length > 0

    if (hasFieldErrors) {
      /*
        Map backend field names to our form's field names.
        The backend uses "username" — our form uses "name".
        All other fields are the same on both sides.
      */
      const fieldMap = {
        username: "name",
        email: "email",
        password: "password",
      }

      const mappedErrors = {}
      Object.keys(data.errors).forEach((backendField) => {
        const formField = fieldMap[backendField] || backendField
        /*
          Zod returns arrays of messages. We take the first one.
          e.g. ["Password must be at least 8 characters"] → first element.
        */
        mappedErrors[formField] = data.errors[backendField][0]
      })

      setErrors((prev) => ({ ...prev, ...mappedErrors }))
    } else {
      /*
        General error — display the server's message directly.
        e.g. "Invalid email or password", "Email already exists"
      */
      setServerError(data.message || "Something went wrong. Please try again.")
    }
  }

  /* ============================================================
     handleSubmit — REPLACED with real API call
     1. Prevent default form submission
     2. Run frontend validation
     3. Set loading state
     4. Call the appropriate API function from AuthContext
     5. On success → AuthContext sets user → App.jsx re-renders
     6. On failure → parse error and display it
  ============================================================ */
  const handleSubmit = async (e) => {
    e.preventDefault()

    const isValid = validate()
    if (!isValid) return

    setIsLoading(true)
    setServerError("")

    try {
      if (isRegister) {
        /*
          FIELD MAPPING:
          Our form uses "name" (labeled "Full Name").
          The backend schema (auth.dto.js) expects "username".
          We map it here so the API receives the correct key.
          The backend Zod schema will validate it as "username".
        */
        await register({
          username: formData.name,
          email: formData.email,
          password: formData.password,
          role: "student", // defaulting to student — no UI selector added
        })
      } else {
        await login({
          email: formData.email,
          password: formData.password,
        })
      }

      /*
        If we reach here, the API call succeeded.
        AuthContext has stored the user in state.
        App.jsx watches isAuthenticated and will re-render
        to show the dashboard. No navigation needed here.
      */

    } catch (error) {
      handleBackendErrors(error)
    } finally {
      /*
        Always re-enable the button whether the request
        succeeded or failed.
      */
      setIsLoading(false)
    }
  }

  /* ============================================================
     toggleToRegister / toggleToLogin
     Switches the view and resets both formData and errors
     so no stale values carry over between modes.
  ============================================================ */
  const resetState = () => ({
    name: "", email: "", password: "", confirmPassword: "",
  })

  const toggleToRegister = () => {
    setIsRegister(true)
    setFormData(resetState())
    setErrors(resetState())
    setServerError("")
  }

  const toggleToLogin = () => {
    setIsRegister(false)
    setFormData(resetState())
    setErrors(resetState())
    setServerError("")
  }

  return (
    /*
      Outer page wrapper:
      - bg-gray-900         → dark background
      - min-h-screen        → fills the full viewport height
      - flex + items-center + justify-center → centers the card
      - overflow-hidden     → clips the glow blobs at the edges
    */
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-900 px-6 py-12">

      {/* ── Background Glow Blobs ── */}
      <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* ── Card ──
          backdrop-blur-xl + bg-white/5 = glassmorphism effect
          border-white/10 = subtle frosted border
          rounded-3xl + shadow-2xl = premium card feel
      */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">

        {/* ── Branding (always visible) ── */}
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
            TutorRoom
          </h1>

          <p className="mt-3 text-sm tracking-[0.25em] uppercase text-cyan-300">
            Connect. Learn. Collaborate.
          </p>

          {/* Heading changes based on mode */}
          <h2 className="mt-10 text-3xl font-bold text-white">
            {isRegister ? "Create Account" : "Sign In"}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {isRegister
              ? "Join TutorRoom and start learning today."
              : "Welcome back! Please sign in to continue."}
          </p>
        </div>

        {/* ── Form ── */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

          {/* ── Full Name — Register only ──
              isRegister && (...) means this only renders when isRegister is true.
          */}
          {isRegister && (
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Full Name
              </label>

              <div className="relative">
                {/* User icon SVG */}
                <svg
                  className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>

                <input
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  /*
                    Conditional border color:
                    errors.name is truthy → red border (border-red-500)
                    errors.name is falsy  → default border (border-white/10)
                  */
                  className={`w-full rounded-xl border bg-white/5 py-3 pl-11 pr-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:ring-2
                    ${errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/30"
                    }`}
                />
              </div>

              {/* Error message — only renders when errors.name is non-empty */}
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
              )}
            </div>
          )}

          {/* ── Email ── */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Email address
            </label>

            <div className="relative">
              {/* Envelope icon SVG */}
              <svg
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>

              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-white/5 py-3 pl-11 pr-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:ring-2
                  ${errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                    : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/30"
                  }`}
              />
            </div>

            {errors.email && (
              <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          {/* ── Password ── */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Password
              </label>

              {/* Forgot password — only shown in Login mode */}
              {!isRegister && (
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-400 transition hover:text-cyan-300"
                >
                  Forgot password?
                </a>
              )}
            </div>

            <div className="relative">
              {/* Lock icon SVG */}
              <svg
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>

              <input
                id="password"
                type="password"
                name="password"
                autoComplete={isRegister ? "new-password" : "current-password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-white/5 py-3 pl-11 pr-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:ring-2
                  ${errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                    : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/30"
                  }`}
              />
            </div>

            {errors.password && (
              <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          {/* ── Confirm Password — Register only ── */}
          {isRegister && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Confirm Password
              </label>

              <div className="relative">
                {/* Shield-check icon SVG */}
                <svg
                  className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>

                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-white/5 py-3 pl-11 pr-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:ring-2
                    ${errors.confirmPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/30"
                    }`}
                />
              </div>

              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {/* ── Server Error Message (NEW) ──
              Displays general backend errors that are not tied to a specific field.
              Examples: "Invalid email or password", "Email already exists"
              Only renders when serverError is non-empty.
          */}
          {serverError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">{serverError}</p>
            </div>
          )}

          {/* ── Submit Button ──
              disabled during loading to prevent double-submission.
              The text and opacity change to give visual feedback.
          */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/30 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {/*
              Show different text based on loading state.
              isLoading true → "Signing in..." / "Creating account..."
              isLoading false → "Sign In" / "Create Account"
            */}
            {isLoading
              ? (isRegister ? "Creating account..." : "Signing in...")
              : (isRegister ? "Create Account" : "Sign In")}
          </button>

          {/* ── Mode Toggle Link ── */}
          <p className="text-center text-sm text-gray-400">
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={isRegister ? toggleToLogin : toggleToRegister}
              className="font-medium text-indigo-400 transition hover:text-cyan-300 cursor-pointer"
            >
              {isRegister ? "Sign In" : "Sign Up"}
            </button>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login