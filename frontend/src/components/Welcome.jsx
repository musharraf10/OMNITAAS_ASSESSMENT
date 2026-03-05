import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body, #root {
    height: 100%; width: 100%; margin: 0; padding: 0;
  }

  .welcome-page {
    width: 100vw; height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    font-family: 'Inter', sans-serif;
    overflow: hidden;
  }

  .welcome-card {
    width: 100%; max-width: 440px;
    background: rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 24px;
    padding: 52px 40px;
    box-shadow: 0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
    text-align: center;
    animation: fadeUp 0.5s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .welcome-avatar {
    width: 72px; height: 72px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px;
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.45);
  }

  .welcome-avatar svg { width: 36px; height: 36px; fill: white; }

  .welcome-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(102, 126, 234, 0.15);
    border: 1px solid rgba(102, 126, 234, 0.3);
    border-radius: 999px;
    padding: 4px 14px;
    color: #a78bfa;
    font-size: 12px; font-weight: 500;
    letter-spacing: 0.6px; text-transform: uppercase;
    margin-bottom: 20px;
  }

  .welcome-badge span.dot {
    width: 6px; height: 6px;
    background: #a78bfa;
    border-radius: 50%;
    animation: pulse 1.8s ease infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.7); }
  }

  .welcome-card h1 {
    color: #ffffff;
    font-size: 28px; font-weight: 700;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
  }

  .welcome-card h1 span {
    background: linear-gradient(135deg, #667eea, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .welcome-subtitle {
    color: rgba(255,255,255,0.4);
    font-size: 14px; line-height: 1.6;
    margin-bottom: 36px;
  }

  .welcome-divider {
    height: 1px;
    background: rgba(255,255,255,0.08);
    margin-bottom: 28px;
  }

  .welcome-logout-btn {
    width: 100%; padding: 14px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    color: rgba(255,255,255,0.7);
    font-size: 14px; font-weight: 500; font-family: 'Inter', sans-serif;
    cursor: pointer; letter-spacing: 0.2px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.25s ease;
  }

  .welcome-logout-btn:hover {
    background: rgba(255, 80, 80, 0.12);
    border-color: rgba(255, 80, 80, 0.3);
    color: #ff9090;
  }

  .welcome-logout-btn svg { width: 16px; height: 16px; }
`;

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
            <style>{styles}</style>
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