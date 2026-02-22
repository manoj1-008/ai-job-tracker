import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Resume from "./pages/Resume";
import Analyzer from "./pages/Analyzer";
import Matcher from "./pages/Matcher";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected with Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Layout>
              <Jobs />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume"
        element={
          <ProtectedRoute>
            <Layout>
              <Resume />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analyzer"
        element={
          <ProtectedRoute>
            <Layout>
              <Analyzer />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="/matcher" element={<Matcher />} />
    </Routes>
  );
}

export default App;