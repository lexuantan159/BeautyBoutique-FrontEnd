import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as request from "../../services/login.js";

function ResetPassword() {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);
  const [a, setA] = useState(null); // State để lưu trữ giá trị a

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await request.otp(username);
    setShowAdditionalInput(true);
    alert(`Một liên kết đặt lại mật khẩu đã được gửi đến ${username}`);
    setA(response.data); // Cập nhật giá trị của a
    console.log("gia tri a:", response.data); // Log giá trị phản hồi vào console
  }

  async function handleCheckotp(e) {
    e.preventDefault();
    var b = otp;
    console.log("gia tri a2:", a);
    console.log("gia tri b:", b);
    if (a && a.toString() === b && b.toString()) {
      await request.reset(username);
      alert("Đã gửi mật khẩu mới đến email của bạn");
    } else {
      alert("OTP không đúng");
    }
  }

  return (
    <div className="reset-password">
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Tên người dùng</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Gửi OTP</button>
      </form>
      {showAdditionalInput && (
        <form>
          <label htmlFor="additionalInput">OTP</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="button" onClick={handleCheckotp}>
            Xác nhận OTP
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
