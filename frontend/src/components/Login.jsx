import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body, #root {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  font-family: 'Inter', sans-serif;
  padding: 20px;
  overflow: hidden;
}

  .login-card {
    width: 100%;
    max-width: 400px;
    background: rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 24px;
    padding: 48px 40px;
    box-shadow: 0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
  }

  .login-logo {
    width: 48px; height: 48px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 28px;
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  }
  .login-logo svg { width: 24px; height: 24px; fill: white; }

  .login-card h2 {
    color: #fff;
    font-size: 26px; font-weight: 700;
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }
  .login-subtitle {
    color: rgba(255,255,255,0.45);
    font-size: 14px;
    margin-bottom: 36px;
  }

  .login-form { display: flex; flex-direction: column; gap: 16px; }

  .input-group { display: flex; flex-direction: column; gap: 8px; }
  .input-group label {
    color: rgba(255,255,255,0.6);
    font-size: 12px; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.8px;
  }

  .input-wrapper { position: relative; display: flex; align-items: center; }
  .input-icon {
    position: absolute; left: 16px;
    width: 18px; height: 18px;
    color: rgba(255,255,255,0.3);
    pointer-events: none;
    transition: color 0.2s ease;
  }
  .input-wrapper:focus-within .input-icon { color: rgba(102, 126, 234, 0.9); }

  .input-wrapper input {
    width: 100%;
    padding: 14px 16px 14px 46px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    color: #fff;
    font-size: 15px; font-family: 'Inter', sans-serif;
    outline: none;
    transition: all 0.25s ease;
  }
  .input-wrapper input::placeholder { color: rgba(255,255,255,0.25); }
  .input-wrapper input:focus {
    background: rgba(255,255,255,0.1);
    border-color: rgba(102, 126, 234, 0.7);
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
  }

  .login-btn {
    margin-top: 8px; width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border: none; border-radius: 12px;
    color: #fff;
    font-size: 15px; font-weight: 600; font-family: 'Inter', sans-serif;
    cursor: pointer; letter-spacing: 0.3px;
    transition: all 0.25s ease;
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.35);
    position: relative; overflow: hidden;
  }
  .login-btn::after {
    content: ''; position: absolute; inset: 0;
    background: rgba(255,255,255,0); transition: background 0.2s ease;
  }
  .login-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(102,126,234,0.5); }
  .login-btn:hover::after { background: rgba(255,255,255,0.08); }
  .login-btn:active { transform: translateY(0); box-shadow: 0 4px 16px rgba(102,126,234,0.3); }

  .login-error {
    display: flex; align-items: center; gap: 8px;
    margin-top: 16px;
    padding: 12px 16px;
    background: rgba(255,80,80,0.12);
    border: 1px solid rgba(255,80,80,0.25);
    border-radius: 10px;
    color: #ff9090; font-size: 13px;
    animation: shake 0.4s ease;
  }
  .login-error svg { flex-shrink: 0; width: 16px; height: 16px; }

  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-6px); }
    40%      { transform: translateX(6px); }
    60%      { transform: translateX(-4px); }
    80%      { transform: translateX(4px); }
  }

  .login-footer {
    margin-top: 28px; text-align: center;
    color: rgba(255,255,255,0.35); font-size: 13px;
  }
  .login-footer a { color: #a78bfa; text-decoration: none; font-weight: 500; transition: color 0.2s; }
  .login-footer a:hover { color: #c4b5fd; }
`;

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("username");
        if (savedUser) setUsername(savedUser);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axios.post("http://localhost:8000/login", { username, password });
            if (res.status === 200) {
                localStorage.setItem("username", username);
                navigate("/welcome");
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : "Server not running");
        }
    };

    return (
        <>
            <style>{styles}</style>
            <div className="login-page">
                <div className="login-card">
                    <div className="login-logo">
                        <svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>
                    </div>

                    <h2>Welcome back</h2>
                    <p className="login-subtitle">Sign in to your account to continue</p>

                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                                </svg>
                                <input id="username" type="text" placeholder="Enter your username"
                                    value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                </svg>
                                <input id="password" type="password" placeholder="Enter your password"
                                    value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                            </div>
                        </div>

                        <button className="login-btn" type="submit">Sign In</button>
                    </form>

                    {error && (
                        <div className="login-error" key={error}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                            </svg>
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Login;