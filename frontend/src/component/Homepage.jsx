import React from "react"

const Homepage = () => {

  /* ============================================================
     STATE 1 — currentTime
     Holds the live Date object, updated every second.
  ============================================================ */
  const [currentTime, setCurrentTime] = React.useState(new Date())

  /* ============================================================
     STATE 2 — isDropdownOpen
     Controls whether the "New Meeting" dropdown is visible.
  ============================================================ */
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  /* ============================================================
     STATE 3 — meetingCode
     Holds the value typed in the meeting code input field.
  ============================================================ */
  const [meetingCode, setMeetingCode] = React.useState("")

  /* ============================================================
     EFFECT — Clock Timer
     Runs once on mount.
     setInterval fires every 1000ms and updates currentTime.
     The cleanup function (return) clears the timer when the
     component unmounts, preventing memory leaks.
  ============================================================ */
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  /* ============================================================
     FORMAT: formattedTime
     Example output -> "07:30 PM"
  ============================================================ */
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  /* ============================================================
     FORMAT: formattedDate
     Example output -> "Friday, July 11"
  ============================================================ */
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  /* ============================================================
     NAVBAR HANDLERS
  ============================================================ */

  const handleNotification = () => {
    // Future: open notification panel
  }

  const handleProfile = () => {
    // Future: open profile/account settings
  }

  /* ============================================================
     SIDEBAR HANDLERS
  ============================================================ */

  const handleMeetings = () => {
    // Future: navigate to meetings page
  }

  const handleDocuments = () => {
    // Future: navigate to documents page
  }

  const handleSettings = () => {
    // Future: navigate to settings page
  }

  const handleX = () => {
    // Future: placeholder X - will be replaced later
  }

  const handleY = () => {
    // Future: placeholder Y - will be replaced later
  }

  const handleZ = () => {
    // Future: placeholder Z - will be replaced later
  }

  /* ============================================================
     NEW MEETING DROPDOWN HANDLERS
  ============================================================ */

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const handleCreateMeeting = () => {
    // Future: generate a room link for later
    setIsDropdownOpen(false)
  }

  const handleInstantMeeting = () => {
    // Future: start a WebRTC room immediately
    setIsDropdownOpen(false)
  }

  const handleScheduleMeeting = () => {
    // Future: open schedule meeting modal/page
    setIsDropdownOpen(false)
  }

  /* ============================================================
     MEETING CODE HANDLER
  ============================================================ */

  const handleMeetingCodeChange = (e) => {
    setMeetingCode(e.target.value)
  }

  /* ============================================================
     JOIN MEETING HANDLER
  ============================================================ */

  const handleJoinMeeting = () => {
    // Future: validate code, connect to WebRTC room
  }

  /* ============================================================
     RENDER
  ============================================================ */
  return (
    /*
      Outer wrapper:
      - bg-gray-900       same dark background as Login
      - min-h-screen      fills full viewport
      - flex flex-col     stacks Navbar on top, body below
      - overflow-hidden   clips glow blobs at edges
    */
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gray-900">

      {/* Background Glow Blobs - Exact same as Login.jsx for design consistency */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* ============================================================
          NAVBAR
          - border-b border-white/10  subtle bottom divider
          - bg-white/5 backdrop-blur-xl  same glassmorphism as Login card
          - z-10  stays on top of all content below
      ============================================================ */}
      <nav className="relative z-10 flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">

        {/* Logo - same gradient as Login */}
        <h1 className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
          TutorRoom
        </h1>

        {/* Right Side: Time + Date + Notification + Profile */}
        <div className="flex items-center gap-4">

          {/* Time and Date - hidden on very small screens */}
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-white">{formattedTime}</p>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>

          {/* Notification Bell Button */}
          <button
            onClick={handleNotification}
            className="relative rounded-xl border border-white/10 bg-white/5 p-2 text-gray-400 transition-all duration-300 hover:border-indigo-500/50 hover:text-indigo-400 active:scale-[0.98]"
          >
            {/* Bell Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            {/* Notification Dot */}
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-cyan-400" />
          </button>

          {/* User Avatar + Profile Button */}
          <button
            onClick={handleProfile}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition-all duration-300 hover:border-indigo-500/50 active:scale-[0.98]"
          >
            {/* Avatar Circle - same gradient as Login button */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-sm font-bold text-white">
              T
            </div>

            {/* Name + Label - hidden on small screens */}
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-white">TutorRoom User</p>
              <p className="text-xs text-gray-400">View Profile</p>
            </div>
          </button>

        </div>
      </nav>

      {/* ============================================================
          BODY - Sidebar + Main Content
          flex flex-1 stretches to fill remaining height after navbar
      ============================================================ */}
      <div className="relative z-10 flex flex-1">

        {/* ============================================================
            LEFT SIDEBAR
            - w-64          fixed sidebar width
            - border-r      right border separating sidebar from content
            - bg-white/5    same glassmorphism as Login card
            - backdrop-blur-xl  frosted glass look
        ============================================================ */}
        <aside className="flex w-64 flex-col gap-1 border-r border-white/10 bg-white/5 p-4 backdrop-blur-xl">

          {/* Section Label */}
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Main Menu
          </p>

          {/* Meetings */}
          <button
            onClick={handleMeetings}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-indigo-500/10 hover:text-indigo-400"
          >
            {/* Video Camera Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            Meetings
          </button>

          {/* Documents */}
          <button
            onClick={handleDocuments}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-indigo-500/10 hover:text-indigo-400"
          >
            {/* Document Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            Documents
          </button>

          {/* Settings */}
          <button
            onClick={handleSettings}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-indigo-500/10 hover:text-indigo-400"
          >
            {/* Gear Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.869a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            Settings
          </button>

          {/* Divider */}
          <div className="my-3 border-t border-white/10" />

          {/* Section Label for placeholders */}
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
            More
          </p>

          {/* X - Placeholder */}
          <button
            onClick={handleX}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-indigo-500/10 hover:text-indigo-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"
              />
            </svg>
            X
          </button>

          {/* Y - Placeholder */}
          <button
            onClick={handleY}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-indigo-500/10 hover:text-indigo-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
              />
            </svg>
            Y
          </button>

          {/* Z - Placeholder */}
          <button
            onClick={handleZ}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-indigo-500/10 hover:text-indigo-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            Z
          </button>

        </aside>

        {/* ============================================================
            MAIN CONTENT AREA
            flex flex-1   takes up all remaining width
            items-center  vertical center
            justify-center  horizontal center
        ============================================================ */}
        <main className="flex flex-1 items-center justify-center px-8 py-12">

          {/*
            Inner container:
            max-w-5xl  caps total width so it does not stretch too wide
            flex-col on small screens, flex-row on large screens
          */}
          <div className="flex w-full max-w-5xl flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">

            {/* ======================================================
                LEFT COLUMN - Heading, Buttons, Input
            ====================================================== */}
            <div className="flex flex-col gap-8 lg:max-w-lg">

              {/* Main Heading */}
              <div>
                <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                  Premium video calls,{" "}
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    now free for everyone
                  </span>
                </h2>

                <p className="mt-4 text-base leading-relaxed text-gray-400">
                  Connect, learn, and collaborate with your classroom — anytime, anywhere. TutorRoom brings your smart classroom to life.
                </p>
              </div>

              {/* New Meeting Button + Dropdown */}
              <div className="relative w-fit">

                {/*
                  New Meeting button:
                  Same gradient + shadow + hover scale as Login submit button.
                  Chevron rotates when dropdown is open.
                */}
                <button
                  onClick={handleToggleDropdown}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/30 active:scale-[0.98]"
                >
                  {/* Plus Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>

                  New Meeting

                  {/* Chevron - rotates 180 degrees when dropdown is open */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Dropdown Menu - only renders when isDropdownOpen is true */}
                {isDropdownOpen && (
                  <div className="absolute left-0 top-full z-30 mt-2 w-60 rounded-2xl border border-white/10 bg-gray-900/90 p-1.5 shadow-2xl backdrop-blur-xl">

                    {/* Option 1: Create a meeting for later */}
                    <button
                      onClick={handleCreateMeeting}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-gray-300 transition-all duration-300 hover:bg-indigo-500/10 hover:text-indigo-400"
                    >
                      {/* Link Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 shrink-0 text-indigo-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                        />
                      </svg>
                      Create a meeting for later
                    </button>

                    {/* Option 2: Start an instant meeting */}
                    <button
                      onClick={handleInstantMeeting}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-gray-300 transition-all duration-300 hover:bg-indigo-500/10 hover:text-indigo-400"
                    >
                      {/* Video Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 shrink-0 text-violet-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                      Start an instant meeting
                    </button>

                    {/* Option 3: Schedule a meeting */}
                    <button
                      onClick={handleScheduleMeeting}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-gray-300 transition-all duration-300 hover:bg-indigo-500/10 hover:text-indigo-400"
                    >
                      {/* Calendar Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 shrink-0 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                      Schedule a meeting
                    </button>

                  </div>
                )}
              </div>

              {/* OR Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-gray-500">or join with a code</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Meeting Code Input + Join Button
                  Input style matches Login.jsx inputs exactly.
                  Join button is disabled and faded when input is empty.
              */}
              <div className="flex items-stretch gap-3">

                {/* Code Input */}
                <div className="relative flex-1">
                  {/* Keyboard / Code Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>

                  <input
                    id="meetingCode"
                    type="text"
                    placeholder="Enter a code or link"
                    value={meetingCode}
                    onChange={handleMeetingCodeChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>

                {/* Join Button
                    disabled when meetingCode is empty (trimmed)
                */}
                <button
                  onClick={handleJoinMeeting}
                  disabled={meetingCode.trim() === ""}
                  className="rounded-xl px-5 py-3 text-sm font-semibold text-indigo-400 transition-all duration-300 hover:bg-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
                >
                  Join
                </button>

              </div>

            </div>

            {/* ======================================================
                RIGHT COLUMN - Meeting Illustration
            ====================================================== */}
            <div className="flex flex-1 items-center justify-center">

              {/*
                Illustration Card:
                Same rounded-3xl, border-white/10, bg-white/5, backdrop-blur-xl, shadow-2xl
                as Login card for design consistency.
              */}
              <div className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">

                {/* Card Inner Glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 via-violet-500/5 to-cyan-500/5" />

                {/* SVG Illustration: Virtual Classroom */}
                <svg
                  viewBox="0 0 360 280"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full"
                >
                  {/* Background Screen Frame */}
                  <rect x="20" y="20" width="320" height="180" rx="16" fill="#1e1b4b" stroke="url(#borderGrad)" strokeWidth="1.5" />

                  {/* Screen top bar dots */}
                  <circle cx="40" cy="35" r="4" fill="#6366f1" opacity="0.7" />
                  <circle cx="56" cy="35" r="4" fill="#8b5cf6" opacity="0.7" />
                  <circle cx="72" cy="35" r="4" fill="#06b6d4" opacity="0.7" />

                  {/* Screen title bar line */}
                  <line x1="90" y1="35" x2="300" y2="35" stroke="white" strokeOpacity="0.08" strokeWidth="1" />

                  {/* Video Tile 1 - large - teacher/presenter */}
                  <rect x="32" y="52" width="180" height="130" rx="12" fill="#312e81" opacity="0.8" />
                  <rect x="32" y="52" width="180" height="130" rx="12" stroke="url(#tileGrad1)" strokeWidth="1" />

                  {/* Teacher avatar */}
                  <circle cx="122" cy="100" r="22" fill="url(#avatarGrad1)" />
                  <ellipse cx="122" cy="148" rx="28" ry="20" fill="url(#avatarGrad1)" opacity="0.5" />

                  {/* Teacher face details */}
                  <circle cx="114" cy="97" r="3" fill="white" opacity="0.8" />
                  <circle cx="130" cy="97" r="3" fill="white" opacity="0.8" />
                  <path d="M115 107 Q122 113 129 107" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

                  {/* Name tag on tile 1 */}
                  <rect x="38" y="163" width="80" height="14" rx="4" fill="black" fillOpacity="0.5" />
                  <rect x="42" y="167" width="6" height="6" rx="1" fill="#06b6d4" />
                  <rect x="52" y="168" width="40" height="4" rx="2" fill="white" opacity="0.5" />

                  {/* Mic active indicator */}
                  <circle cx="200" cy="65" r="7" fill="#10b981" opacity="0.9" />
                  <rect x="197" y="60" width="6" height="8" rx="2" fill="white" />
                  <path d="M194 67 Q197 72 203 67" stroke="white" strokeWidth="1" strokeLinecap="round" />

                  {/* Video Tile 2 - small - student 1 */}
                  <rect x="224" y="52" width="106" height="60" rx="10" fill="#1e1b4b" opacity="0.9" />
                  <rect x="224" y="52" width="106" height="60" rx="10" stroke="url(#tileGrad2)" strokeWidth="1" />
                  <circle cx="277" cy="72" r="14" fill="url(#avatarGrad2)" />
                  <ellipse cx="277" cy="96" rx="18" ry="12" fill="url(#avatarGrad2)" opacity="0.4" />
                  <circle cx="272" cy="70" r="2" fill="white" opacity="0.7" />
                  <circle cx="282" cy="70" r="2" fill="white" opacity="0.7" />
                  <path d="M273 77 Q277 80 281 77" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
                  <rect x="229" y="101" width="50" height="7" rx="3" fill="black" fillOpacity="0.4" />
                  <rect x="232" y="103" width="20" height="3" rx="1" fill="white" opacity="0.4" />

                  {/* Video Tile 3 - small - student 2 */}
                  <rect x="224" y="122" width="106" height="60" rx="10" fill="#1e1b4b" opacity="0.9" />
                  <rect x="224" y="122" width="106" height="60" rx="10" stroke="url(#tileGrad3)" strokeWidth="1" />
                  <circle cx="277" cy="142" r="14" fill="url(#avatarGrad3)" />
                  <ellipse cx="277" cy="166" rx="18" ry="12" fill="url(#avatarGrad3)" opacity="0.4" />
                  <circle cx="272" cy="140" r="2" fill="white" opacity="0.7" />
                  <circle cx="282" cy="140" r="2" fill="white" opacity="0.7" />
                  <path d="M273 147 Q277 150 281 147" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
                  <rect x="229" y="171" width="50" height="7" rx="3" fill="black" fillOpacity="0.4" />
                  <rect x="232" y="173" width="20" height="3" rx="1" fill="white" opacity="0.4" />

                  {/* Bottom Toolbar */}
                  <rect x="80" y="215" width="200" height="44" rx="14" fill="#0f172a" fillOpacity="0.9" stroke="white" strokeOpacity="0.1" strokeWidth="1" />

                  {/* Mic button */}
                  <circle cx="120" cy="237" r="14" fill="#1e1b4b" />
                  <rect x="116" y="229" width="8" height="12" rx="3" fill="#6366f1" />
                  <path d="M113 240 Q116 246 124 240" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="120" y1="246" x2="120" y2="250" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Camera button */}
                  <circle cx="160" cy="237" r="14" fill="#1e1b4b" />
                  <rect x="151" y="232" width="14" height="10" rx="3" fill="#8b5cf6" />
                  <path d="M165 234 L171 231 L171 243 L165 240" fill="#8b5cf6" />

                  {/* End call button */}
                  <circle cx="200" cy="237" r="14" fill="#ef4444" />
                  <path d="M193 236 Q200 231 207 236 L205 240 Q200 237 195 240Z" fill="white" />

                  {/* Share screen button */}
                  <circle cx="240" cy="237" r="14" fill="#1e1b4b" />
                  <rect x="233" y="231" width="14" height="10" rx="2" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
                  <path d="M240 231 L240 226 M237 228 L240 225 L243 228" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Participant count chip */}
                  <rect x="258" y="228" width="36" height="18" rx="9" fill="#6366f1" fillOpacity="0.2" stroke="#6366f1" strokeOpacity="0.4" strokeWidth="1" />
                  <text x="276" y="240" fill="#a5b4fc" fontSize="9" textAnchor="middle" fontFamily="system-ui">3 / 8</text>

                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient id="borderGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
                    </linearGradient>
                    <linearGradient id="tileGrad1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="tileGrad2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="tileGrad3" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                    </linearGradient>
                    <radialGradient id="avatarGrad1" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </radialGradient>
                    <radialGradient id="avatarGrad2" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </radialGradient>
                    <radialGradient id="avatarGrad3" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#0891b2" />
                    </radialGradient>
                  </defs>
                </svg>

                {/* Caption below illustration */}
                <p className="mt-4 text-center text-xs uppercase tracking-widest text-cyan-300">
                  Your classroom, reimagined
                </p>

              </div>
            </div>

          </div>
        </main>

      </div>
    </div>
  )
}

export default Homepage
