import React, { useState } from "react";
import "./Login.css";
import { icons } from "../../utils/icons";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  function handleMouseEnter(event) {
    event.target.classList.add("hovered");
  }

  function handleMouseLeave(event) {
    event.target.classList.remove("hovered");
  }

  return (
    <div className="Auth-form-container">
      <div className="body-right">
        <h1 className="Auth-form-title">Log In</h1>
        <div className="Auth-form-content">
          <div className="form-group mt-3">
            <label>Phone number</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter phone number"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </div>
      <h2 class="or"> hoặc </h2>
      <div className="body-right">
        <div className="Auth-form-content">
          <h3 className="title3">
            Log in to shop and use the latest utilities from
            www.beautyboutique.com
          </h3>
          <div className="d-grid gap-2 mt-3">
            <button className="btlogin" type="submit">
              <a
                className="bt-left"
                href="https://www.facebook.com/studiofotofusion"
              >
                <div className="icon-container">
                  <icons.AiOutlineFacebook className="icon" />
                </div>
              </a>
              <h2 className="bt-right">Continue with Facebook</h2>
            </button>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btlogin" type="submit">
              <a
                className="bt-left"
                href="https://www.facebook.com/studiofotofusion"
              >
                <div className="icon-container">
                  <FcGoogle className="google-icon" />{" "}
                  {/* Thêm biểu tượng Google */}
                </div>
              </a>
              <h2 className="bt-right">Continue with Google</h2>
            </button>
          </div>
          <h3 className="title2 text-right mt-2">
            Do not have an account?{" "}
            <a className="bt-left" href="">
              Register.
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
