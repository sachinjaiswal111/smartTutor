import React from "react"
import Homepage from "./component/Homepage.jsx"

/*
  App.jsx is the root component.
  Currently rendering Homepage for preview.

  To switch back to Login, change:
    import Homepage from "./component/Homepage.jsx"
    <Homepage />
  to:
    import Login from "./component/Login.jsx"
    <Login />

  Future: React Router will handle navigation between pages.
  All styling is done with Tailwind CSS utility classes.
  The global Tailwind import lives in index.css -> main.jsx.
*/
function App() {
  return (
    <Homepage />
  )
}

export default App
