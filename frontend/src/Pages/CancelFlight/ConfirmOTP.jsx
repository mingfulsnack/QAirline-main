import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ConfirmOTP({ email, onConfirm, onClose, onResendOTP }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!otp.trim()) {
      toast.error("Vui lòng nhập mã OTP", { position: "top-right" });
      return;
    }

    setLoading(true);
    try {
      // Gọi hàm onConfirm từ component cha và đợi kết quả
      await onConfirm();

      // Nếu thành công thì hiển thị toast và chuyển trang
      toast.success("Huỷ đặt chỗ thành công", { position: "top-right" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      // Nếu có lỗi thì hiển thị thông báo lỗi
      toast.error(error.response?.data?.message || "Có lỗi xảy ra", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="confirmOTP content">
      <button className="close-btn" onClick={onClose}>
        ✕
      </button>
      <h2>Xác nhận OTP</h2>
      <p>
        Để thực hiện giao dịch, Quý khách vui lòng nhập mã xác thực đã được gửi
        tới email {email}
      </p>
      <div className="content-fill">
        <div className="input-area">
          <input
            type="text"
            placeholder=" "
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <label>Mã OTP</label>
        </div>
      </div>
      <div className="buts">
        <div className="findingBut OTPBut">
          <button onClick={onResendOTP}>Gửi lại</button>
        </div>
        <div className="findingBut OTPBut">
          <button onClick={handleSubmit}>Xác thực</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOTP;
