// import React, { FC, useState } from "react";
import PropTypes from "prop-types";

const FlightCard = ({ flight }) => {
  const { departure, arrival, prices, duration, stops } = flight;

  return (
    <div className="flight-card">
      <div className="flight-info">
        <div className="timeline">
          <div className="timeleft">
            <p>
              {departure.time} ({departure.location})
            </p>
          </div>

          <div className="dashed-line"></div>

          <div className="timeright">
            <p>
              {arrival.time} ({arrival.location})
            </p>
          </div>
        </div>
        <div className="details">
          <p>Thời gian bay: {duration}</p>
          <p>[Mã máy bay] Khai thác bởi QAirline</p>
          <a href="">Chi tiết hành trình</a>
        </div>
      </div>
      <div className="flight-classes">
        <div className="class-box eco">
          <h5>Economy</h5>
          <p>{prices.economy} VND</p>
        </div>
        <div className="class-box busi">
          <h5>Business</h5>
          <p>{prices.business} VND</p>
        </div>
      </div>
    </div>
  );
};

// Kiểm tra kiểu dữ liệu với PropTypes
FlightCard.propTypes = {
  flight: PropTypes.shape({
    airline: PropTypes.string.isRequired,
    departure: PropTypes.shape({
      time: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    }).isRequired,
    arrival: PropTypes.shape({
      time: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    }).isRequired,
    prices: PropTypes.shape({
      economy: PropTypes.string.isRequired,
      business: PropTypes.string.isRequired,
    }).isRequired,
    duration: PropTypes.string.isRequired,
    stops: PropTypes.string.isRequired,
  }).isRequired,
};

export default FlightCard;
