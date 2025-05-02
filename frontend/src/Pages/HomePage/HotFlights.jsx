import React, { useState } from "react";
import "./HotFlights.scss";
import PropTypes from "prop-types";

function HotFlights({ hotFlightClick }) {
  const [hotFlights] = useState([
    {
      path_pic: "assets/hotflights/hn-sgn.png",
      city_from: "Hà Nội",
      airport_from_code: "HAN",
      city_to: "Thành phố Hồ Chí Minh",
      airport_to_code: "SGN",
      date_departure: "2025-07-25",
      base_price: 1500000,
    },
    {
      path_pic: "assets/hotflights/sgn-hn.png",
      city_from: "Thành phố Hồ Chí Minh",
      airport_from_code: "SGN",
      city_to: "Hà Nội",
      airport_to_code: "HAN",
      date_departure: "2025-07-10",
      base_price: 1500000,
    },
    {
      path_pic: "assets/hotflights/hue-phuquoc.png",
      city_from: "Huế",
      airport_from_code: "HUI",
      city_to: "Phú Quốc, Kiên Giang",
      airport_to_code: "PQC",
      date_departure: "2025-07-05",
      base_price: 1000000,
    },
    {
      path_pic: "assets/hotflights/phuquoc-hue.png",
      city_from: "Phú Quốc, Kiên Giang",
      airport_from_code: "PQC",
      city_to: "Huế",
      airport_to_code: "HUI",
      date_departure: "2025-07-25",
      base_price: 1000000,
    },
    {
      path_pic: "assets/hotflights/hn-danang.png",
      city_from: "Hà Nội",
      airport_from_code: "HAN",
      city_to: "Đà Nẵng",
      airport_to_code: "DAD",
      date_departure: "2025-07-06",
      base_price: 1000000,
    },
    {
      path_pic: "assets/hotflights/danang-hn.png",
      city_from: "Đà Nẵng",
      airport_from_code: "DAD",
      city_to: "Hà Nội",
      airport_to_code: "HAN",
      date_departure: "2025-07-20",
      base_price: 1000000,
    },
    {
      path_pic: "assets/hotflights/danang-sg.png",
      city_from: "Đà Nẵng",
      airport_from_code: "DAD",
      city_to: "Thành phố Hồ Chí Minh",
      airport_to_code: "SGN",
      date_departure: "2025-07-11",
      base_price: 1000000,
    },
    {
      path_pic: "assets/hotflights/sg-danang.png",
      city_from: "Thành phố Hồ Chí Minh",
      airport_from_code: "SGN",
      city_to: "Đà Nẵng",
      airport_to_code: "DAD",
      date_departure: "2025-07-15",
      base_price: 1000000,
    },
    {
      path_pic: "assets/hotflights/hn-phuquoc.png",
      city_from: "Hà Nội",
      airport_from_code: "HAN",
      city_to: "Phú Quốc, Kiên Giang",
      airport_to_code: "PQC",
      date_departure: "2025-07-08",
      base_price: 1800000,
    },
    {
      path_pic: "assets/hotflights/phuquoc-hn.png",
      city_from: "Phú Quốc, Kiên Giang",
      airport_from_code: "PQC",
      city_to: "Hà Nội",
      airport_to_code: "HAN",
      date_departure: "2025-07-16",
      base_price: 1800000,
    },
  ]);

  const [visibleCount, setVisibleCount] = useState(9);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="hot-flights-container">
      <h2 className="hot-flights-title">Các Chuyến Bay Nổi Bật</h2>
      <div className="hot-flights-grid">
        {hotFlights.slice(0, visibleCount).map((flight, index) => (
          <div
            key={index}
            className="hot-flight-item"
            onClick={() => hotFlightClick(flight)}
          >
            <img src={flight.path_pic} alt="Flight" className="flight-image" />
            <h4>
              {flight.city_from} ({flight.airport_from_code}) → {flight.city_to}{" "}
              ({flight.airport_to_code})
            </h4>
            <p>Ngày khởi hành: {formatDate(flight.date_departure)}</p>
            <p>
              Giá:{" "}
              {flight.base_price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
        ))}
      </div>
      {visibleCount < hotFlights.length && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={loadMore}>
            Xem Thêm
          </button>
        </div>
      )}
    </div>
  );
}

HotFlights.propTypes = {
  hotFlightClick: PropTypes.func.isRequired,
};

export default HotFlights;
