import React from "react";
import "./FlightInfo.scss";
import FlightInfoResult from "./FlightInfoResult";
import NotExistFlight from "../../CommonComponents/NotExistFlight";
import axios from "../../Apis/axios";
import { useState } from "react";
21;
//Find & Show ticket info

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
    <div className="flightInfo">
      <h1 className="title">Thông tin chuyến bay</h1>
      <div className="content">
        <button className="buttop">Mã đặt chỗ/Số vé điện tử</button>
        <div className="content-fill">
          <div className="input-area">
            <input
              type="text"
              placeholder=" "
              name="bookingId"
              value={formData.bookingId}
              onChange={handleInputChange}
            />
            <label htmlFor="">Mã đặt chỗ/Số vé điện tử</label>
          </div>
          <div className="input-area">
            <input
              type="text"
              placeholder=" "
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <label htmlFor="">Email</label>
          </div>
          <div className="input-area">
            <input type="text" placeholder=" " />
            <label htmlFor="">Số điện thoại</label>
          </div>
        </div>
        <div className="findingBut">
          <button onClick={handleSearch}>Tìm kiếm</button>
        </div>
      </div>

      {searching &&
        (flightInfo ? (
          <FlightInfoResult
            booking_date={flightInfo?.booking_date}
            cancellation_deadline={flightInfo?.cancellation_deadline}
            createdAt={flightInfo?.createdAt}
            flight_id={flightInfo?.flight_id}
            guest_info={flightInfo?.guest_info}
            status={flightInfo?.status}
            _id={flightInfo?._id}
          />
        ) : (
          <NotExistFlight />
        ))}
    </div>
  );
}

export default FlightInfo;
