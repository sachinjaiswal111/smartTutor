import { Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout";
import MeetingLayout from "../layouts/MeetingLayout";

import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoutes.jsx";

import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import CreateMeeting from "../pages/CreateMeeting.jsx";
import MeetingRoom from "../pages/MeetingRoom.jsx";
import NotFound from "../pages/NotFound.jsx";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ==========================
          Public Routes
      ========================== */}

      <Route
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      >
        <Route
          path="/login"
          element={<Login />}
        />
      </Route>

      {/* ==========================
          Dashboard Routes
      ========================== */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<Home />}
        />

        <Route
          path="create-meeting"
          element={<CreateMeeting />}
        />
      </Route>

      {/* ==========================
          Meeting Routes
      ========================== */}

      <Route
        element={
          <ProtectedRoute>
            <MeetingLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/meeting/:meetingCode"
          element={<MeetingRoom />}
        />
      </Route>

      {/* ==========================
          Redirect
      ========================== */}

      <Route
        path="/home"
        element={<Navigate to="/" replace />}
      />

      {/* ==========================
          404
      ========================== */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
};

export default AppRoutes;