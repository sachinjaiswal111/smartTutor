import React from "react"
import Login from "./component/Login.jsx"

/*
  App.jsx is the root component.
  Its only job is to render the Login component.

  We no longer import App.css because all styling is now
  done with Tailwind CSS utility classes directly in Login.jsx.
  The global Tailwind import lives in index.css → main.jsx.
*/
function App() {
  return (
    <Login />
  )
}

export default App
