/*
  src/api/authApi.js
  ==================
  All authentication HTTP calls live here.

  WHY THIS FILE EXISTS:
  Login.jsx should not know HOW to talk to the server — it should only
  know WHAT it wants (login, register, etc.).
  This file is the only place that knows the API endpoint paths.

  Each function:
  - Takes clean JavaScript data
  - Makes the HTTP request
  - Returns response.data (the JSON body from the server)
  - Throws on error (axios does this automatically for 4xx/5xx responses)
    so the caller (AuthContext) can catch and handle errors

  We do NOT catch errors here — we let them bubble up to the caller.
  This keeps each function simple and single-responsibility.
*/

import axiosInstance from "./axios.js"

/*
  loginUser
  ---------
  POST /auth/login
  Body: { email, password }

  Success response:
  { success: true, data: { id, username, email, role, ... }, message: "Login successful" }

  Error responses:
  400 — Zod validation failed (bad email format, empty password)
  401 — Wrong email or password
*/
export const loginUser = async ({ email, password }) => {
  const response = await axiosInstance.post("/auth/login", { email, password })
  return response.data
}

/*
  registerUser
  ------------
  POST /auth/register
  Body: { username, email, password, role }

  Note: our form field is called "name" but backend expects "username".
  The mapping happens in Login.jsx's handleSubmit — not here.
  This function receives the already-mapped object.

  Success response:
  { success: true, data: { id, username, email, role, ... }, message: "User registered successfully" }

  Error responses:
  400 — Zod validation failed (username too short, weak password, etc.)
  409 — Username or email already exists
*/
export const registerUser = async ({ username, email, password, role }) => {
  const response = await axiosInstance.post("/auth/register", {
    username,
    email,
    password,
    role,
  })
  return response.data
}

/*
  logoutUser
  ----------
  POST /auth/logout
  No body required. The HttpOnly cookie is sent automatically.
  Backend clears the cookie in the response.

  Success response:
  { success: true, data: null, message: "Logged out successfully" }
*/
export const logoutUser = async () => {
  const response = await axiosInstance.post("/auth/logout")
  return response.data
}

/*
  getCurrentUser
  --------------
  GET /auth/me
  No body required. The HttpOnly cookie proves identity.

  Used on every page load to restore the session if the cookie is still valid.

  Success response:
  { success: true, data: { id, username, email, role, ... } }

  Error response:
  401 — Cookie missing or expired (user is not logged in)
*/
export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me")
  return response.data
}
