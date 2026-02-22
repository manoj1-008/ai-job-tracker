import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 40px",
      background: "#222",
      color: "white"
    }}>
      <div>
        <strong>AI Job Tracker</strong>
      </div>

      {token && (
        <div style={{ display: "flex", gap: "20px" }}>
          <Link style={{ color: "white" }} to="/dashboard">Dashboard</Link>
          <Link style={{ color: "white" }} to="/jobs">Jobs</Link>
          <Link style={{ color: "white" }} to="/resume">Resume</Link>
          <Link style={{ color: "white" }} to="/analyzer">Analyzer</Link>
          <Link to="/matcher">Matcher</Link>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Navbar;