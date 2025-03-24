import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "../../Apis/axios";
import { toast, ToastContainer } from "react-toastify";
function AddAircraft({ onAddAircraft }) {
  const [newAircraft, setNewAircraft] = useState({
    aircraft_code: "",
    manufacturer: "",
    model: "",
    total_seats: "",
    manufacture_date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu POST đến API
      const response = await axios.post("/admin/aircrafts", {
        aircraft_code: newAircraft.aircraft_code,
        manufacturer: newAircraft.manufacturer,
        model: newAircraft.model,
        total_seats: parseInt(newAircraft.total_seats), // Chuyển số ghế sang số nguyên
        manufacture_date: newAircraft.manufacture_date,
      });

      // Cập nhật danh sách tàu bay qua props
      onAddAircraft(response);

      // Reset form
      setNewAircraft({
        aircraft_code: "",
        manufacturer: "",
        model: "",
        total_seats: "",
        manufacture_date: "",
      });

      toast.success("Thêm tàu bay thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm tàu bay:", error);
      alert("Có lỗi xảy ra khi thêm tàu bay.");
    }
  };

  return (
    <div className="addAircraftForm">
      <div className="addContent">
        <h3>Thêm Tàu Bay</h3>
        <form onSubmit={handleSubmit} className="form-columns">
          <div className="column">
            <input
              type="text"
              placeholder="Mã tàu bay"
              value={newAircraft.aircraft_code}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  aircraft_code: e.target.value,
                })
              }
              required
            />
            <input
              type="text"
              placeholder="Nhà sản xuất"
              value={newAircraft.manufacturer}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  manufacturer: e.target.value,
                })
              }
              required
            />
            <input
              type="text"
              placeholder="Mô hình"
              value={newAircraft.model}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, model: e.target.value })
              }
              required
            />
          </div>
          <div className="column">
            <input
              type="number"
              placeholder="Tổng số ghế ngồi"
              value={newAircraft.total_seats}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, total_seats: e.target.value })
              }
              required
            />
            <input
              type="date"
              placeholder="Ngày sản xuất"
              value={newAircraft.manufacture_date}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  manufacture_date: e.target.value,
                })
              }
              required
            />
            <button className="addButton" type="submit">
              Thêm tàu bay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddAircraft.propTypes = {
  onAddAircraft: PropTypes.func.isRequired,
};

export default AddAircraft;
