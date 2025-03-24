import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./NavbarAdmin.scss";
import { Link } from "react-router-dom";
const NavbarAdmin = () => {
  let login = false;
  const navigate = useNavigate();

  const navigateTo = (endpoint) => {
    navigate(endpoint);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="app-icon">
          <Link to="/">
            <img src="./assets/QAirlineNewLogo.png" alt="" />
          </Link>
        </div>
      </div>
      <ul className="sidebar-list">
        <li
          className="sidebar-list-item active"
          onClick={() => navigateTo("/Posts")}
        >
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-shopping-bag"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>Posts</span>
          </a>
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => navigateTo("/AircraftInfo")}
        >
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-pie-chart"
            >
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
            <span>Aircraft Info</span>
          </a>
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => navigateTo("/FlightsInfo")}
        >
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-inbox"
            >
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
            </svg>
            <span>Flight Info</span>
          </a>
        </li>

        <li
          className="sidebar-list-item"
          onClick={() => navigateTo("/statistic")}
        >
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-inbox"
            >
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
            </svg>
            <span>Statistics</span>
          </a>
        </li>
        <li className="sidebar-list-item">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-bell"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span>Inbox</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

NavbarAdmin.propTypes = {
  onSearchClick: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};

export default NavbarAdmin;
