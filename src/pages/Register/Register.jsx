import React, { useState } from "react";
import "./Register.css";
import { icons } from "../../utils/icons";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý logic đăng ký tại đây
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h1 className="Auth-form-title">Register</h1>
          <h3 className="title2">
            Register to purchase and use the latest utilities from
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
          <h3 className="title2">
            Do you already have an account?{" "}
            <a className="bt-left" href="">
              Log in.
            </a>
          </h3>
        </div>
      </form>
      <form className="Auth-form">
        <div className="Auth-form-content">
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter full name"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email/Phone</label>
            <input
              type="email"
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
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
