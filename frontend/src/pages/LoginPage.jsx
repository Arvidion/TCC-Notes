import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Logic untuk autentikasi login
    console.log("Login with", { username, password });
    try {
      const result = await login(username, password); // simpan token ke context & cookie
      if (result) {
        navigate("/notes"); // redirect setelah login
      } else {
        alert("Login failed");
      }

    } catch (error) {
      // Log error untuk debug
      console.error("Login Error:", error.response ? error.response.data : error.message);
      alert("Login failed: " + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="column is-half is-offset-one-quarter">
          <div className="box">
            <h2 className="title is-3 has-text-centered">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="field">
                <label className="label" htmlFor="username">Username</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="password">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-primary is-fullwidth" type="submit">
                    Login
                  </button>
                </div>
              </div>
              {error && <p className="has-text-danger has-text-centered">{error}</p>}
              <p className="has-text-centered mt-4">
                Belum punya akun?{" "}
                <Link to="/register" className="has-text-link">
                  Daftar Disini
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
