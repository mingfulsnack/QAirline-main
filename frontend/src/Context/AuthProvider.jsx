import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const parseUsername = function (s) {
    // Tạo username mặc định, ví dụ từ email
    return s ? s.split("@")[0] : null;
  };
  useEffect(() => {
    // Lấy dữ liệu từ Local Storage khi ứng dụng khởi chạy
    const storedUser = JSON.parse(localStorage.getItem("profile"));
    if (storedUser) {
      setIsLoggedIn(true);
      setUsername(parseUsername(storedUser));
    }
  }, []);
  const login = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.user.email);
    localStorage.setItem("accessToken", JSON.stringify(userData.token));
    localStorage.setItem("role", JSON.stringify(userData.user.role));
    localStorage.setItem("profile", JSON.stringify(userData.user.email));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("profile");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useAuth = () => useContext(AuthContext);
