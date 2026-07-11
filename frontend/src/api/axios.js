/*
  src/api/axios.js
  ================
  Central axios instance for the entire frontend.

  WHY THIS FILE EXISTS:
  Instead of writing `axios.post("http://localhost:4000/api/v1/auth/login", ...)`
  everywhere, we create one configured instance here.
  Every other file imports this instance — so the base URL is defined
  in exactly ONE place. If the URL ever changes, you change it here only.

  withCredentials: true
  ─────────────────────
  Our backend uses HttpOnly cookies (not localStorage) to store the JWT.
  HttpOnly cookies are invisible to JavaScript — they're automatically
  sent by the browser on every matching request.

  BUT — by default, browsers block cookies on cross-origin requests
  (frontend on :5173, backend on :4000 = different ports = cross-origin).

  `withCredentials: true` tells the browser:
    "Yes, include cookies on cross-origin requests."

  The backend's CORS config must also allow this (credentials: true in cors()).
  Your backend already has that set in app.js — so we're good.
*/

import axios from "axios"

const BASE_URL = "http://localhost:4000/api/v1"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
