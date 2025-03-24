import "./App.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRouteElement from "./useRouteElement";
import Navbar from "./CommonComponents/Navbar";
import Footer from "./CommonComponents/Footer";
import HomePage from "./Pages/HomePage/HomePage";
import HomeAdmin from "./AdminPages/HomeAdmin/HomeAdmin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { smoothScrollTo } from "./CommonFunctions/SmoothScroll";

function App() {
  const routeElement = useRouteElement();
  const navigate = useNavigate();
  const [flightData, setFlightData] = useState(null);
  const isHomePage = routeElement?.props?.children.type === HomePage;
  const isAdminPage =
    window.location.pathname.startsWith("/HomeAdmin") ||
    window.location.pathname.startsWith("/AircraftInfo") ||
    window.location.pathname.startsWith("/FlightsInfo") ||
    window.location.pathname.startsWith("/Posts") ||
    window.location.pathname.startsWith("/statistic");
  const flightSearchRef = useRef(null);
  const handleScrollToFlightSearch = () => {
    if (flightSearchRef.current) {
      smoothScrollTo(flightSearchRef);
    }
  };

  const handleNavbarSearchClick = () => {
    if (isHomePage) {
      handleScrollToFlightSearch();
    } else {
      // Điều hướng đến HomePage và cuộn xuống
      navigate("/", { state: { scrollToFlightSearch: true } });
    }
  };

  const handleHotFlightClick = (flightData) => {
    handleScrollToFlightSearch();
    setFlightData(flightData);
  };

  return (
    <div>
      {isAdminPage ? (
        <HomeAdmin>{routeElement}</HomeAdmin>
      ) : (
        <>
          <Navbar onSearchClick={handleNavbarSearchClick} />
          {isHomePage ? (
            <HomePage
              flightSearchRef={flightSearchRef}
              hotFlightClick={handleHotFlightClick}
              flightData={flightData}
            />
          ) : (
            routeElement
          )}
          <Footer />
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default App;
