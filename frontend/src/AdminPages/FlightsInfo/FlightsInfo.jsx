import React, { useState, useEffect } from "react";
import "./FlightInfo.scss";
import AddFlight from "./AddFlight";
import FlightResult from "./FlightResult";
import axios from "../../Apis/axios";
import { toast } from "react-toastify";
const Status = {
  SEARCH: "search",
  SHOWALL: "showall",
  ADD: "add",
};

function formatDateTime(isoString) {
  const date = new Date(isoString);

  // Định dạng: DD/MM/YYYY HH:mm
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

  return formattedDate;
}

function FlightsInfo() {
  const [flightList, setFlightList] = useState([]);

  const [searchId, setSearchId] = useState("");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [action, setAction] = useState("showall");
  // const [editingFlight, setEditingFlight] = useState(null);
  useEffect(() => {
    const fetchAircrafts = async () => {
      try {
        const response = await axios.get("/flights/");
        setFlightList(response);
        // console.log("Danh sách tàu bay:", response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tàu bay:", error);
      }
    };

    fetchAircrafts();
  }, []);

  const handleSaveFlight = async (updatedFlight) => {
    try {
      const response = await axios.put(
        `/admin/flights/${updatedFlight._id}/delay`,
        {
          flight_number: updatedFlight.flight_number,
          origin_airport_id: updatedFlight.origin_airport_id,
          destination_airport_id: updatedFlight.destination_airport_id,
          scheduled_departure: updatedFlight.scheduled_departure,
          scheduled_arrival: updatedFlight.scheduled_arrival,
          status: updatedFlight.status,
          base_price: parseFloat(updatedFlight.base_price),
          available_seats: parseInt(updatedFlight.available_seats, 10),
        }
      );
      console.log("response", response);
      console.log("updatedFlight", updatedFlight);
      // console.log("response", response);

      // Cập nhật danh sách
      const updatedList = flightList.map((flight) =>
        flight._id === updatedFlight._id ? response : flight
      );

      setFlightList(updatedList);
      toast.success("Lưu chuyến bay thành công!");
      setAction(Status.SHOWALL);
    } catch (error) {
      console.error("Lỗi khi lưu chuyến bay:", error);
      toast.error("Lỗi khi lưu chuyến bay!");
    }
  };

  const handleEditFlight = (flight) => {
    const formattedFlight = {
      _id: flight._id,
      origin_airport_id: flight.origin_airport_id.airport_code,
      destination_airport_id: flight.destination_airport_id.airport_code,
      scheduled_departure: flight.scheduled_departure,
      scheduled_arrival: flight.scheduled_arrival,
      status: flight.status,
      base_price: flight.base_price,
      available_seats: flight.available_seats,
    };
    setSelectedFlight(formattedFlight);
    setAction(Status.SEARCH);
  };
  // Hàm để thêm chuyến bay mới
  const handleAddFlight = (newFlight) => {
    setFlightList([...flightList, newFlight]);
    setAction(Status.SHOWALL);
  };

  return (
    <div className="flightInfo">
      <div className="searchBarContainer">
        <span>Quản lý các chuyến bay</span>
        <button
          className="addButton primary"
          onClick={() => setAction(Status.ADD)}
        >
          Thêm chuyến bay
        </button>
        <button
          className="addButton secondary"
          onClick={() => setAction(Status.SHOWALL)}
        >
          Tất cả chuyến bay
        </button>
      </div>

      {action === Status.SHOWALL && (
        <div className="flightTable">
          {flightList.length > 0 ? (
            <table className="flight-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Mã chuyến bay</th>
                  <th>Xuất phát từ</th>
                  <th>Điểm đến</th>
                  <th>Thời gian cất cánh</th>
                  <th>Thời gian hạ cánh</th>
                  <th>Trạng thái</th>
                  <th>Giá vé</th>
                  <th>Ghế khả dụng</th>
                  <th className="action-header">EDIT</th>
                </tr>
              </thead>
              <tbody>
                {flightList.map((flight, index) => (
                  <tr key={flight?._id || index}>
                    <td>{index + 1}</td>
                    <td>{flight.flight_number || flight._id}</td>
                    <td>
                      {flight.origin_airport_id?.airport_code ||
                        flight.origin_airport_id}
                    </td>
                    <td>
                      {flight.destination_airport_id?.airport_code ||
                        flight.destination_airport_id}
                    </td>
                    <td>{formatDateTime(flight.scheduled_departure)}</td>
                    <td>{formatDateTime(flight.scheduled_arrival)}</td>
                    <td>{flight.status}</td>
                    <td>{flight.base_price}</td>
                    <td>{flight.available_seats}</td>
                    <td className="action-cell">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditFlight(flight)}
                      >
                        EDIT
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">Chưa có chuyến bay nào.</p>
          )}
        </div>
      )}

      {action === Status.ADD && <AddFlight onAddFlight={handleAddFlight} />}

      {action === Status.SEARCH && selectedFlight && (
        <FlightResult flight={selectedFlight} onSave={handleSaveFlight} />
      )}
    </div>
  );
}

export default FlightsInfo;
