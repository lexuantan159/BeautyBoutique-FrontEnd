import React, { useState } from "react";
import * as loginApi from "../../services/login";
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginApi.login(username, password);
      if (response.status === 200) {
        const token = response.data.token;
        console.log(token);
        localStorage.setItem("token", token);
        const getUser = await loginApi.getUser(token);
        console.log(getUser);
        navigate("/product");
      } else {
        // Xử lý lỗi nếu có
        const errorData = response.data;
        setError(errorData.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login");
    }
  };
  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
