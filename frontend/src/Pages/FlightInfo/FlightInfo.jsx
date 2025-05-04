import React from "react";
import "./FlightInfo.scss";
import FlightInfoResult from "./FlightInfoResult";
import NotExistFlight from "../../CommonComponents/NotExistFlight";
import axios from "../../Apis/axios";
import { useState } from "react";

let searching = false;
function FlightInfo() {
  const [formData, setFormData] = useState({
    bookingId: "",
    email: "",
  });
  const [flightInfo, setFlightInfo] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGoBack = () => {
    searching = false;
    setFlightInfo(null);
    setFormData((prevState) => ({
      ...prevState,
      bookingId: "",
    }));
  };
  const handleSearch = async (e) => {
    searching = true;
    e.preventDefault();

    try {
      const queryParams = new URLSearchParams(formData).toString();
      const response = await axios.get(
        `/bookings/searchBooking?${queryParams}`
      );
      // console.log(response);

      setFlightInfo(response);
      // console.log(flightInfo);
    } catch (error) {
      setFlightInfo(null);
      console.error(error);
    }
  };
  console.log(flightInfo);
  console.log(searching);

  return (
    <div className="flight-info-container">
      <h1 className="flight-info-title">Thông tin chuyến bay</h1>
      <div className="flight-info-search-box">
        <h2 className="search-title">Tìm kiếm thông tin đặt chỗ</h2>
        <div className="input-group">
          <div className="input-field">
            <input
              type="text"
              id="bookingId"
              name="bookingId"
              value={formData.bookingId}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="bookingId">Mã đặt chỗ/Số vé điện tử</label>
          </div>
          <div className="input-field">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          {/* You can add the phone number input if needed */}
          {/* <div className="input-field">
            <input type="tel" id="phone" placeholder=" " />
            <label htmlFor="phone">Số điện thoại</label>
          </div> */}
        </div>
        <button className="search-button" onClick={handleSearch}>
          <i className="fas fa-search"></i> Tìm kiếm
        </button>
      </div>

      {searching &&
        (flightInfo ? (
          <FlightInfoResult {...flightInfo} />
        ) : (
          <NotExistFlight onGoBack={handleGoBack} />
        ))}
    </div>
  );
}

export default FlightInfo;
