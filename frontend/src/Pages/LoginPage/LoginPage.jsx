import React, { useState, useEffect, useRef } from "react";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
import axios from "../../Apis/axios";
import { useAuth } from "../../Context/AuthProvider";
import { toast } from "react-toastify";
function LoginPage() {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  useEffect(() => {
    input1Ref.current.focus();

    const timer = setTimeout(() => {
      input2Ref.current.focus();
    }, 300);

    return () => clearTimeout(timer);
  }, []);
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", formData);
      // console.log(response);

      if (!response.token) {
        setError("Mật khẩu không trùng khớp");
        return;
      }
      if (response) {
        toast.success("Đăng nhập thành công!");
      }
      login(response);
      // Reset form và error
      setError("");
      setFormData({ email: "", password: "" });

      // Chuyển hướng sau khi đăng nhập thành công

      navigate("/");
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

  return (
    <div className="login">
      <div className="left-outline">
        <h2>Welcome Back 👋</h2>
        <p>Your next journey starts now.</p>
        <p>Book flights easily and explore the world your way.</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="content-fill col">
            <div className="input-area">
              <label>Email</label>
              <input
                ref={input1Ref}
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Example@email.com"
              />
            </div>

            <div className="input-area">
              <label>Password</label>
              <input
                ref={input2Ref}
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="At least 8 characters"
                className="input-pw"
              />
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

            <div className="forgot-pw">
              <span onClick={() => navigateTo("/ForgotPW")}>
                Forgot Password?
              </span>
            </div>
          </div>

          <div className="findingBut">
            <button>Sign in</button>
          </div>
        </form>

        <div className="signup-text">
          Don't you have an account?{" "}
          <span className="su" onClick={() => navigateTo("/RegisterPage")}>
            Sign up
          </span>
        </div>
      </div>

      <div className="content login-content">
        <img
          className="login-img"
          src="/assets/loginImg.jpg"
          alt="Login Background"
        />
      </div>
    </div>
  );
}

export default LoginPage;
