import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Home from "./Home";
import FlightSearch from "../SearchComponent/FlightSearch";
import Support from "./Support";
import Info from "./Info";
import Lounge from "./Lounge";
import Travelers from "./Travelers";
import Subscribers from "./Subscribers";
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
    <div>
      <Home />
      <FlightSearch ref={flightSearchRef} flightData={flightData} />
      <Post />
      <HotFlights hotFlightClick={hotFlightClick} />
      {/* <Support /> */}
      {/* <Info />
      <Lounge /> */}
      {/* <Travelers />
      <Subscribers /> */}
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
