import React, { useState, useEffect, useRef } from "react";
import "./RegisterPage.scss";
import { useNavigate } from "react-router-dom";
import axios from "../../Apis/axios";
import { toast } from "react-toastify";
function RegisterPage() {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);

  useEffect(() => {
    input1Ref.current.focus();

    const timer = setTimeout(() => {
      input2Ref.current.focus();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không trùng khớp");
      return;
    }
    try {
      const response = await axios.post("/auth/register", formData);
      console.log(response);

      if (response) {
        toast.success("Đăng ký thành công!");
      }
      // Reset form và error
      setError("");
      setFormData({ email: "", password: "" });

      // Chuyển hướng sau khi đăng nhập thành công

      navigate("/LoginPage");
    } catch (error) {
      setError(error.response?.data?.message || "Đã có lỗi xảy ra");
    }
  };

  const navigateTo = (endpoint) => {
    navigate(endpoint);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="login flightInfo">
      <div className="content login-content">
        <h2>Đăng ký</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="content-fill col">
            <div className="input-area">
              <input
                ref={input1Ref}
                autoFocus
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder=" "
              />
              <label>Tên đăng nhập</label>
            </div>

            <div className="input-area">
              <input
                ref={input2Ref}
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder=" "
                className="input-pw"
              />
              <label>Mật khẩu</label>
              <img
                src={
                  showPassword
                    ? "./assets/eye-open.png"
                    : "./assets/eye-close.png"
                }
                alt="Toggle Password Visibility"
                className="eye"
                onClick={togglePasswordVisibility}
              />
            </div>

            <div className="input-area">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder=" "
                className="input-pw"
              />
              <label>Nhập lại mật khẩu</label>
              <img
                src={
                  showConfirmPassword
                    ? "./assets/eye-open.png"
                    : "./assets/eye-close.png"
                }
                alt="Toggle Password Visibility"
                className="eye"
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </div>

          <div className="forgot-pw">
            <span className="su" onClick={() => navigateTo("/LoginPage")}>
              Đăng nhập
            </span>
            <span onClick={() => navigateTo("/ForgotPW")}>Quên mật khẩu</span>
          </div>

          <div className="findingBut">
            <button type="submit">Đăng ký</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
