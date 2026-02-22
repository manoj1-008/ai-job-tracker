import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold text-indigo-400 mb-10">
          AI Job Tracker
        </h1>

        <nav className="flex flex-col gap-4">
          <Link className="hover:text-indigo-400" to="/dashboard">Dashboard</Link>
          <Link className="hover:text-indigo-400" to="/jobs">Jobs</Link>
          <Link className="hover:text-indigo-400" to="/resume">Resume</Link>
          <Link className="hover:text-indigo-400" to="/analyzer">Analyzer</Link>

          <button
            onClick={logout}
            className="mt-10 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  );
}

export default Layout;