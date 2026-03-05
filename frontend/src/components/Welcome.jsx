import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css"

function Welcome() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) navigate("/");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <>
      <div className="welcome-page">
        <div className="welcome-card">

          <div className="welcome-avatar">
            <svg viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>

          <div className="welcome-badge">
            <span className="dot" />
            Active Session
          </div>

          <h1>Welcome, <span>{username}</span></h1>
          <p className="welcome-subtitle">You're successfully signed in.<br />Glad to have you back.</p>

          <div className="welcome-divider" />

          <button className="welcome-logout-btn" onClick={handleLogout}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
            Sign Out
          </button>

        </div>
      </div>
    </>
  );
}

export default Welcome;