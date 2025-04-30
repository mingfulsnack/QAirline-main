import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthProvider";
import PropTypes from "prop-types";
import "./Navbar.css"; // Make sure to create this CSS file

const validPaths = ["/", "/FlightInfo", "/CancelFlight", "/MyBooking"];

const Navbar = ({ onSearchClick }) => {
  const { isLoggedIn, username, logout } = useAuth();

  const [showPopover, setShowPopover] = useState(false); // Hiển thị popover
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("/");
  const location = useLocation();

  useEffect(() => {
    if (validPaths.includes(location.pathname)) {
      setActiveItem(location.pathname);
    } else {
      setActiveItem(null); // Không kích hoạt bất kỳ mục nào
    }
  }, [location.pathname]);

  // Điều hướng
  const navigateTo = (endpoint) => {
    setActiveItem(endpoint);
    navigate(endpoint);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    logout();
    navigateTo("/");
  };

  // Toggle popover
  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  return (
    <header className="navbar-container">
      <div className="navBar">
        <div className="navBarOne">
          <Link to={"/"} className="logo-link">
            <div className="logoDiv">
              <img src="./assets/QAirlineNewLogo.png" alt="Logo" />
            </div>
          </Link>

          <ul className="items">
            <li className="itemButton">
              <button onClick={onSearchClick}>Đặt vé ngay</button>
            </li>
            <li
              className={`listItem ${activeItem === "/" ? "active" : ""}`}
              onClick={() => navigateTo("/")}
            >
              Trang chủ
            </li>
            <li
              className={`listItem ${
                activeItem === "/FlightInfo" ? "active" : ""
              }`}
              onClick={() => navigateTo("/FlightInfo")}
            >
              Thông tin chuyến bay
            </li>
            <li
              className={`listItem ${
                activeItem === "/CancelFlight" ? "active" : ""
              }`}
              onClick={() => navigateTo("/CancelFlight")}
            >
              Hủy vé
            </li>
            {localStorage.getItem("role") && (
              <li
                className={`listItem ${
                  activeItem === "/MyBooking" ? "active" : ""
                }`}
                onClick={() => navigateTo("/MyBooking")}
              >
                My Booking
              </li>
            )}
          </ul>

          <div className="auth-section">
            {!isLoggedIn ? (
              <>
                <span
                  className="login-link"
                  onClick={() => navigateTo("/LoginPage")}
                >
                  Đăng nhập
                </span>
                <span
                  className="signUp"
                  onClick={() => navigateTo("/RegisterPage")}
                >
                  Đăng ký
                </span>
              </>
            ) : (
              <div className="user-menu">
                <span onClick={togglePopover} className="username">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="user-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Xin chào,
                  {" " + username}
                </span>
                {showPopover && (
                  <div className="popover">
                    <ul>
                      <li onClick={() => navigateTo("/profile")}>
                        Thông tin cá nhân
                      </li>
                      {localStorage.getItem("role") &&
                        localStorage.getItem("role").replace(/"/g, "") ===
                          "admin" && (
                          <li onClick={() => navigateTo("/HomeAdmin")}>
                            Quản trị viên
                          </li>
                        )}
                      <li onClick={handleLogout}>Đăng xuất</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  onSearchClick: PropTypes.func,
};

export default Navbar;
