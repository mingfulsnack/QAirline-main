import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./SearchResults.scss";

const SearchResults = () => {
  const calculateDuration = (departure, arrival) => {
    const differenceMs = new Date(arrival) - new Date(departure);
    const hours = Math.floor(differenceMs / (1000 * 60 * 60));
    const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours and ${minutes} minutes`;
  };
  const location = useLocation();
  const { searchResults, searchParams } = location.state || {};
  console.log(searchResults);

  if (!searchResults) {
    return (
      <div className="no-results">
        <h2>Không tìm thấy kết quả</h2>
        <Link to="/" className="back-button">
          Quay lại trang tìm kiếm
        </Link>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="search-summary">
        <h2>Kết quả tìm kiếm chuyến bay</h2>
        <div className="search-params">
          <p>Từ: {searchParams.origin}</p>
          <p>Đến: {searchParams.destination}</p>
          <p>
            Ngày đi:{" "}
            {new Date(searchParams.departureDate).toLocaleDateString("vi-VN")}
          </p>
          {searchParams.returnDate && (
            <p>
              Ngày về:{" "}
              {new Date(searchParams.returnDate).toLocaleDateString("vi-VN")}
            </p>
          )}
          <p>Số hành khách: {searchParams.passengers}</p>
        </div>
      </div>

      <div className="flights-list">
        {searchResults.map((flight, index) => (
          <div key={index} className="flight-card">
            <div className="flight-header">
              <h3>Chuyến bay {flight.flight_number}</h3>
              <span className="price">
                {flight?.base_price?.toLocaleString("vi-VN")} VND
              </span>
            </div>

            <div className="flight-details">
              <div className="time-details">
                <div className="departure">
                  <strong>
                    {flight.scheduled_departure
                      ? new Date(
                          flight.scheduled_departure
                        ).toLocaleDateString()
                      : "N/A"}
                  </strong>
                  <span>{flight.origin_airport_id.airport_name}</span>
                </div>
                <div className="duration">
                  <span>
                    {calculateDuration(
                      flight.scheduled_departure,
                      flight.scheduled_arrival
                    )}
                  </span>
                  <div className="flight-line">
                    <span className="plane-icon">✈</span>
                  </div>
                </div>
                <div className="arrival">
                  <strong>
                    {flight.scheduled_arrival
                      ? new Date(flight.scheduled_arrival).toLocaleDateString()
                      : "N/A"}
                  </strong>
                  <span>{flight.destination}</span>
                </div>
              </div>

              <div className="flight-info">
                <p>Hãng bay: {flight.airline}</p>
                <p>Loại máy bay: {flight.aircraft}</p>
                <p>Ghế trống: {flight.availableSeats}</p>
              </div>
            </div>

            <button className="select-flight-btn">Chọn chuyến bay</button>
          </div>
        ))}
      </div>

      <Link to="/" className="back-button">
        Tìm kiếm mới
      </Link>
    </div>
  );
};

export default SearchResults;
