import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await api.post("token/", { username, password });

      // ✅ Store both tokens under "authTokens" so CreateComplaint can find them
      localStorage.setItem(
        "authTokens",
        JSON.stringify({
          access: res.data.access,
          refresh: res.data.refresh
        })
      );

      setMsg("Login success ✅ Now go to Complaints page.");
      navigate("/complaints"); // automatically go to complaints page

    } catch (err) {
      setMsg("Login failed ❌ Check username/password");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      <p>{msg}</p>
    </div>
  );
}
