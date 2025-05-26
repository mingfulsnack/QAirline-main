import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./FlightResult.scss";
function FlightResult({ flight, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableFlight, setEditableFlight] = useState(flight);

  useEffect(() => {
    // Cập nhật editableFlight khi prop flight thay đổi
    setEditableFlight(flight);
  }, [flight]);

  const handleChange = (key, value) => {
    setEditableFlight((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleEditClick = () => {
    if (isEditing) {
      console.log("Lưu thay đổi:", editableFlight);
      onSave(editableFlight); // Gửi chuyến bay đã chỉnh sửa lên component cha
    }
    setIsEditing(!isEditing); // Chuyển đổi trạng thái chỉnh sửa
  };

  return (
    <div className="flightInfo FlightResult">
      <div className="content">
        <button className="editButton" onClick={handleEditClick}>
          {isEditing ? "Lưu" : "Sửa"}
        </button>
        <ul>
          <li>
            Mã chuyến bay: {/* Không cho phép chỉnh sửa, chỉ hiển thị */}
            <span>{editableFlight.flight_number}</span>
          </li>
          <li>
            Xuất phát từ: {/* Không cho phép chỉnh sửa, chỉ hiển thị */}
            <span>{editableFlight.origin_airport_id}</span>
          </li>
          <li>
            Điểm đến: {/* Không cho phép chỉnh sửa, chỉ hiển thị */}
            <span>{editableFlight.destination_airport_id}</span>
          </li>
          <li>
            Thời gian cất cánh dự kiến:{" "}
            {isEditing ? (
              <input
                type="datetime-local"
                value={editableFlight.scheduled_departure || ""}
                onChange={(e) =>
                  handleChange("scheduled_departure", e.target.value)
                }
              />
            ) : (
              <span>{editableFlight.scheduled_departure}</span>
            )}
          </li>
          <li>
            Thời gian hạ cánh dự kiến:{" "}
            {isEditing ? (
              <input
                type="datetime-local"
                value={editableFlight.scheduled_arrival || ""}
                onChange={(e) =>
                  handleChange("scheduled_arrival", e.target.value)
                }
              />
            ) : (
              <span>{editableFlight.scheduled_arrival}</span>
            )}
          </li>
          <li>
            Trạng thái: {/* Không cho phép chỉnh sửa, chỉ hiển thị */}
            <span>{editableFlight.status}</span>
          </li>
          <li>
            Giá vé: {/* Không cho phép chỉnh sửa, chỉ hiển thị */}
            <span>{editableFlight.base_price}</span>
          </li>
          <li>
            Số ghế khả dụng: {/* Không cho phép chỉnh sửa, chỉ hiển thị */}
            <span>{editableFlight.available_seats}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Cập nhật PropTypes
FlightResult.propTypes = {
  flight: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    flight_number: PropTypes.string,
    origin_airport_id: PropTypes.string.isRequired, // Có thể là string ID hoặc string code
    destination_airport_id: PropTypes.string.isRequired, // Có thể là string ID hoặc string code
    scheduled_departure: PropTypes.string.isRequired,
    scheduled_arrival: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    base_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    available_seats: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default FlightResult;
