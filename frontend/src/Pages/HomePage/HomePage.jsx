import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import HeroSection from "./HeroSection/HeroSection";
import FlightSearch from "../SearchComponent/FlightSearch";

import Post from "./Post";
import { smoothScrollTo } from "../../CommonFunctions/SmoothScroll";
import HotFlights from "./HotFlights";

function HomePage({ flightSearchRef, hotFlightClick, flightData }) {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToFlightSearch && flightSearchRef.current) {
      smoothScrollTo(flightSearchRef);
    }
  }, [location.state, flightSearchRef]);

  return (
    <div
      className="home-container"
      style={{
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeroSection />
      <FlightSearch ref={flightSearchRef} flightData={flightData} />
      <Post />
      <HotFlights hotFlightClick={hotFlightClick} />
    </div>
  );
}

HomePage.propTypes = {
  flightSearchRef: PropTypes.shape({
    current: PropTypes.any, // `current` thường là DOM element hoặc null
  }),
  hotFlightClick: PropTypes.func,
  flightData: PropTypes.any,
};

export default HomePage;
