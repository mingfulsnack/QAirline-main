import React from "react";
import { FaPlane } from "react-icons/fa";
import PropTypes from "prop-types";

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
    const date = new Date(dateInput); // Chuyển đổi input thành đối tượng Date
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
    <div className="flightInfoResult">
      {/* <div className="cancelBut">
        <button>Huỷ vé</button>
      </div> */}
      <div className="header">
        <div className="basicInfo">
          <div className="nameCus">
            <p>ĐÃ CHUẨN BỊ CHO</p>
            <h2>{guest_info?.full_name}</h2>
          </div>
          <div className="code">
            <p>
              MÃ ĐẶT CHỖ <span>{_id}</span>
            </p>
          </div>
        </div>
        <div className="logoDiv">
          <img src="/assets/Qlogo.png" alt="" className="logoImg" />
          <h1>QAIRLINE</h1>
        </div>
      </div>
      <div className="contentRes">
        <div className="contentHeader">
          <FaPlane className="icon" />
          {/* <div className="timeline">
            <p className="t1">
              KHỞI HÀNH:<strong>{flight_id?.scheduled_departure}</strong>
              <span className="triangle-right"></span>
              ĐẾN: <strong>{flight_id?.scheduled_arrival}</strong>
            </p>
            <p>Vui lòng kiểm tra thời gian bay trước khi khởi hành</p>
          </div> */}
        </div>
        <div className="contentBody">
          <div className="leftBody">
            <h1>QAIRLINE</h1>
            <div>
              <p>Khoang:</p>
              <p>Phổ thông</p>
            </div>
            <div>
              <p>Tình trạng chỗ:</p>
              <strong>{status}</strong>
            </div>
          </div>
          <div className="rightBody">
            <div className="leftDiv">
              <div className="goto">
                <div className="loca">
                  <h2>{flight_id?.origin_airport_id?.airport_code}</h2>
                  <h4>
                    {flight_id?.origin_airport_id?.city +
                      " , " +
                      flight_id?.origin_airport_id?.country}
                  </h4>
                </div>
                <div className="triangle-right"></div>
                <div className="loca mr">
                  <h2>{flight_id?.destination_airport_id?.airport_code}</h2>
                  <h4>
                    {flight_id?.destination_airport_id?.city +
                      " , " +
                      flight_id?.destination_airport_id?.country}
                  </h4>
                </div>
              </div>
              <div className="time">
                <div className="showTime timeGo">
                  <div className="path1">
                    <p>Giờ khởi hành:</p>
                    <h2>{formattedDate(flight_id?.scheduled_departure)}</h2>
                  </div>
                  <div className="path2"></div>
                </div>
                <div className="showTime timeCome">
                  <div className="path1">
                    <p>Giờ đến:</p>
                    <h2>{formattedDate(flight_id?.scheduled_arrival)}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="rightDiv" style={{ width: "30%" }}>
              <img
                src="assets/Qlogo-nobg.png"
                alt=""
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
        <div className="contentFooter">
          <div className="f1">
            <div className="top">
              <p>Tên hành khách:</p>
            </div>
            <div className="bot">
              <p>{guest_info?.full_name}</p>
            </div>
          </div>
          <div className="f2">
            <div className="top">
              <p>Ghế:</p>
            </div>
            <div className="bot">
              <p>Được thông báo khi check in</p>
            </div>
          </div>
          {/* <div className="f3">
            <div className="top">
              <p>Biên nhận ticket:</p>
            </div>
            <div className="bot">
              <p>123456789</p>
            </div>
          </div> */}
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
};
export default FlightInfoResult;
