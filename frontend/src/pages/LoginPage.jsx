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
    console.log("Login with", { username, password });
    try {
      const result = await login(username, password);
      if (result) {
        navigate("/notes");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
      alert("Login failed: " + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef]">
    <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-[#d6c4a8]">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#6e4c1e]">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-[#7a6149]">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-3 mt-2 border border-[#c2b49b] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b28b55] bg-[#fcfbf8]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-[#7a6149]">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 mt-2 border border-[#c2b49b] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b28b55] bg-[#fcfbf8]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-[#a67c52] text-white rounded-md hover:bg-[#8a6642] transition"
        >
          Login
        </button>
      </form>
      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}
      <p className="mt-4 text-center text-sm text-[#6e4c1e]">
        Belum punya akun?{" "}
        <Link to="/register" className="text-[#a67c52] hover:underline">
          Daftar Disini
        </Link>
      </p>
    </div>
  </div>
);


export default LoginPage;
