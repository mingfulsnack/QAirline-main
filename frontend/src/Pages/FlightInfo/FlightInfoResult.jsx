import React from "react";
import { FaPlane } from "react-icons/fa";
import PropTypes from "prop-types";
import "./FlightInfoResult.scss"; // Import SCSS file

function FlightInfoResult({
  booking_date,
  cancellation_deadline,
  createdAt,
  flight_id,
  guest_info,
  status,
  _id,
}) {
  function formattedDate(dateInput) {
    const date = new Date(dateInput);
    const optionsDate = {
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const optionsTime = { timeZone: "UTC", hour: "2-digit", minute: "2-digit" };

    const datePart = date.toLocaleDateString("vi-VN", optionsDate);
    const timePart = date.toLocaleTimeString("vi-VN", optionsTime);

    return `${datePart} - ${timePart}`;
  }

  return (
    <div className="flight-info-result-container">
      <div className="header-section">
        <div className="guest-info">
      
          <h2 className="guest-name">{guest_info?.full_name}</h2>
        </div>
        <div className="booking-code">
          <p>
            MÃ ĐẶT CHỖ: <span className="code-value">{_id}</span>
          </p>
        </div>
        <div className="airline-logo">
          
          <h1 className="airline-name">QAIRLINE</h1>
        </div>
      </div>
      <h3 className="in4">Thông tin hãng hàng không</h3>
      <div className="flight-details">
        <div className="flight-icon">
          <FaPlane />
        </div>
        <div className="flight-route">
          <div className="departure">
            <h3 className="airport-code">
              {flight_id?.origin_airport_id?.airport_code}
            </h3>
            <p className="city-country">
              {flight_id?.origin_airport_id?.city},{" "}
              {flight_id?.origin_airport_id?.country}
            </p>
            <p className="time">
              {formattedDate(flight_id?.scheduled_departure)}
            </p>
          </div>
          <div className="arrow-icon">→</div>
          <div className="arrival">
            <h3 className="airport-code">
              {flight_id?.destination_airport_id?.airport_code}
            </h3>
            <p className="city-country">
              {flight_id?.destination_airport_id?.city},{" "}
              {flight_id?.destination_airport_id?.country}
            </p>
            <p className="time">
              {formattedDate(flight_id?.scheduled_arrival)}
            </p>
          </div>
        </div>
      </div>
      <p className="flight-status">
          Trạng thái:{" "}
          <strong className={status === "Confirmed" ? "confirmed" : "pending"}>
            {status}
          </strong>
        </p>
        <p className="airline-name-full">Khoang: <strong>phổ thông</strong></p>
        <hr className="section-divider" />
      <div className="passenger-info-section">
        <h3>Thông tin hành khách</h3>
        <div className="info-grid">
          <div className="info-item">
            <p className="label">Tên hành khách:</p>
            <p className="value">{guest_info?.full_name}</p>
          </div>
          <div className="info-item">
            <p className="label">Mã đặt chỗ:</p>
            <p className="value">{_id}</p>
          </div>
          <div className="info-item">
            <p className="label">Ngày đặt chỗ:</p>
            <p className="value">{formattedDate(booking_date)}</p>
          </div>
          {cancellation_deadline && (
            <div className="info-item">
              <p className="label">Hạn chót hủy:</p>
              <p className="value">{formattedDate(cancellation_deadline)}</p>
            </div>
          )}
          {/* You can add more details here if needed */}
        </div>
      </div>

    </div>
  );
}

FlightInfoResult.propTypes = {
  cancellation_deadline: PropTypes.string,
  createdAt: PropTypes.string,
  flight_id: PropTypes.object,
  guest_info: PropTypes.object,
  status: PropTypes.string,
  _id: PropTypes.string,
  booking_date: PropTypes.string, // Added booking_date to propTypes
};

export default FlightInfoResult;
