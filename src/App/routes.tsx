import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import type { ReactNode } from "react";
import DashboardPage from "../modules/Admin/pages/DashboardPage";
import CreateTaskPage from "../modules/Tasks/pages/CreateTaskPage";
import LoginPage from "../modules/auth/pages/LoginPage";
import SigninPage from "../modules/auth/pages/SigninPage";
import ManageTasksPage from "../modules/auth/pages/ManageTasksPage";
import TeamMemebersPage from "../modules/Users/pages/TeamMemebersPage";
import { useAuthStore } from "../modules/auth/state/auth.store";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isHydrating = useAuthStore((state) => state.isHydrating);

  if (isHydrating) {
    return <div>Loading session...</div>;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function RootRoute() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isHydrating = useAuthStore((state) => state.isHydrating);

  if (isHydrating) {
    return <div>Loading session...</div>;
  }

  return <Navigate to={accessToken ? "/home" : "/login"} replace />;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRoute />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <ManageTasksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/create"
          element={
            <ProtectedRoute>
              <CreateTaskPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/team-members"
          element={
            <ProtectedRoute>
              <TeamMemebersPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SigninPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
