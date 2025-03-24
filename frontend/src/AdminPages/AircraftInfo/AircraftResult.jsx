import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../Apis/axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
function AircraftResult({ aircraft, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableAircraft, setEditableAircraft] = useState(aircraft);
  const navigate = useNavigate();
  useEffect(() => {
    setEditableAircraft(aircraft);
  }, [aircraft]);

  const handleChange = (key, value) => {
    setEditableAircraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Hàm xử lý khi nhấn "Xóa"
  const handleDelete = async () => {
    try {
      await axios.delete(`/admin/aircraft/${aircraft._id}`);
      console.log("Xóa thành công");
      onDelete(aircraft._id); // Gọi hàm xóa khỏi danh sách
      toast.success("Xóa tàu bay thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa tàu bay:", error);
    }
  };

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        const response = await axios.put(
          `/admin/aircraft/${editableAircraft._id}`,
          editableAircraft
        );
        console.log("Cập nhật thành công:", response);
        onUpdate(response); // Gọi hàm cập nhật danh sách
        setIsEditing(false); // Thoát chế độ chỉnh sửa
        toast.success("Cập nhật tàu bay thành công!");
      } catch (error) {
        console.error("Lỗi khi cập nhật tàu bay:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flightInfo aircraftResult">
      <div className="content">
        <button className="editButton" onClick={handleEditClick}>
          {isEditing ? "Lưu" : "Sửa"}
        </button>
        <button className="deleteButton" onClick={handleDelete}>
          Xóa
        </button>
        <ul>
          <li>
            Mã tàu bay:{" "}
            {isEditing ? (
              <input
                type="text"
                value={editableAircraft.aircraft_code}
                onChange={(e) => handleChange("aircraft_code", e.target.value)}
              />
            ) : (
              <span>{editableAircraft.aircraft_code}</span>
            )}
          </li>
          <li>
            Nhà sản xuất:{" "}
            {isEditing ? (
              <input
                type="text"
                value={editableAircraft.manufacturer}
                onChange={(e) => handleChange("manufacturer", e.target.value)}
              />
            ) : (
              <span>{editableAircraft.manufacturer}</span>
            )}
          </li>
          <li>
            Mô hình:{" "}
            {isEditing ? (
              <input
                type="text"
                value={editableAircraft.model}
                onChange={(e) => handleChange("model", e.target.value)}
              />
            ) : (
              <span>{editableAircraft.model}</span>
            )}
          </li>
          <li>
            Tổng số ghế ngồi:{" "}
            {isEditing ? (
              <input
                type="number"
                value={editableAircraft.total_seats}
                onChange={(e) => handleChange("total_seats", e.target.value)}
              />
            ) : (
              <span>{editableAircraft.total_seats}</span>
            )}
          </li>
          <li>
            Ngày sản xuất:{" "}
            {isEditing ? (
              <input
                type="date"
                value={editableAircraft.manufacture_date}
                onChange={(e) =>
                  handleChange("manufacture_date", e.target.value)
                }
              />
            ) : (
              <span>{editableAircraft.manufacture_date}</span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

// Định nghĩa PropTypes
AircraftResult.propTypes = {
  aircraft: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    aircraft_code: PropTypes.string.isRequired,
    manufacturer: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    total_seats: PropTypes.number.isRequired,
    manufacture_date: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AircraftResult;
