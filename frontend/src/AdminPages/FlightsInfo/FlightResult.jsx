import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function FlightResult({ flight, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableFlight, setEditableFlight] = useState(flight);

  useEffect(() => {
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
      onSave(editableFlight);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flightInfo FlightResult">
      <div className="content">
        <button className="editButton" onClick={handleEditClick}>
          {isEditing ? "Lưu" : "Sửa"}
        </button>
        <ul>
          <li>
            Mã chuyến bay:{" "}
            {isEditing ? (
              <input
                type="text"
                value={editableFlight.id}
                onChange={(e) => handleChange("id", e.target.value)}
              />
            ) : (
              <span>{editableFlight.id}</span>
            )}
          </li>
          <li>
            Xuất phát từ:{" "}
            {isEditing ? (
              <input
                type="text"
                value={editableFlight.origin_airport_id}
                onChange={(e) =>
                  handleChange("origin_airport_id", e.target.value)
                }
              />
            ) : (
              <span>{editableFlight.origin_airport_id}</span>
            )}
          </li>
          <li>
            Điểm đến:{" "}
            {isEditing ? (
              <input
                type="text"
                value={editableFlight.destination_airport_id}
                onChange={(e) =>
                  handleChange("destination_airport_id", e.target.value)
                }
              />
            ) : (
              <span>{editableFlight.destination_airport_id}</span>
            )}
          </li>
          <li>
            Thời gian cất cánh dự kiến:{" "}
            {isEditing ? (
              <input
                type="datetime-local"
                value={editableFlight.scheduled_departure}
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
                value={editableFlight.scheduled_arrival}
                onChange={(e) =>
                  handleChange("scheduled_arrival", e.target.value)
                }
              />
            ) : (
              <span>{editableFlight.scheduled_arrival}</span>
            )}
          </li>
          <li>
            Trạng thái:{" "}
            {isEditing ? (
              <input
                type="text"
                value={editableFlight.status}
                onChange={(e) => handleChange("status", e.target.value)}
              />
            ) : (
              <span>{editableFlight.status}</span>
            )}
          </li>
          <li>
            Giá vé:{" "}
            {isEditing ? (
              <input
                type="text"
                value={editableFlight.base_price}
                onChange={(e) => handleChange("base_price", e.target.value)}
              />
            ) : (
              <span>{editableFlight.base_price}</span>
            )}
          </li>
          <li>
            Số ghế khả dụng:{" "}
            {isEditing ? (
              <input
                type="number"
                value={editableFlight.available_seats}
                onChange={(e) =>
                  handleChange("available_seats", e.target.value)
                }
              />
            ) : (
              <span>{editableFlight.available_seats}</span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

// Định nghĩa PropTypes
FlightResult.propTypes = {
  flight: PropTypes.shape({
    id: PropTypes.string.isRequired,
    origin_airport_id: PropTypes.string.isRequired,
    destination_airport_id: PropTypes.string.isRequired,
    scheduled_departure: PropTypes.string.isRequired,
    scheduled_arrival: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    base_price: PropTypes.string.isRequired,
    available_seats: PropTypes.number.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default FlightResult;
