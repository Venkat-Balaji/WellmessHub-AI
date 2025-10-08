import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Clients from "./pages/Clients";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Forums from "./pages/Forums";
import Notifications from "./pages/Notifications";
import History from "./pages/History";
import Programs from "./pages/Programs";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <ThemeProvider>
              <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                <Sidebar />
                <div className="flex flex-col flex-1">
                  <Topbar />
                  <main className="p-4 overflow-y-auto">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/clients" element={<Clients />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/programs" element={<Programs />} />
                      <Route path="/appointments" element={<Appointments/>} />
                      <Route path="/forums" element={<Forums />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/history" element={<History />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ThemeProvider>
          </PrivateRoute>
        }
      />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
