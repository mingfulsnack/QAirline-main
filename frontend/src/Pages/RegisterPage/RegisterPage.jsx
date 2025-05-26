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
    <div className="login ">
      <div className="left-outline">
        <h2>Register</h2>
        <p>Create your account and take off with ease.</p>
        <p>
          Sign up to book flights, manage trips, and explore new destinations.
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="content-fill col">
            <div className="input-area">
              <label>Email</label>
              <input
                ref={input1Ref}
                type="email"
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
            <div className="input-area">
              <label>Repassword</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Enter your password again"
                className="input-pw"
              />
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

            <div className="forgot-pw">
              <span onClick={() => navigateTo("/ForgotPW")}>
                Forgot Password?
              </span>
            </div>
          </div>

          <div className="findingBut">
            <button>Sign Up</button>
          </div>
        </form>

        <div className="signup-text">
          You already have an account?{" "}
          <span className="su" onClick={() => navigateTo("/LoginPage")}>
            Sign in
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

export default RegisterPage;
