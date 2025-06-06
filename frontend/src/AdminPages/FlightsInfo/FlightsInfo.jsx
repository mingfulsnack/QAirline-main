/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./FlightInfo.scss"; // Đảm bảo file SCSS này tồn tại
import AddFlight from "./AddFlight"; // Đảm bảo component này tồn tại và hoạt động
import FlightResult from "./FlightResult";
import axios from "../../Apis/axios"; // Đảm bảo đường dẫn axios đúng
import { toast } from "react-toastify"; // Đảm bảo react-toastify được cài đặt và cấu hình

const Status = {
  SEARCH: "search",
  SHOWALL: "showall",
  ADD: "add",
};

// Hàm định dạng thời gian để hiển thị trong bảng
function formatDateTime(isoString) {
  if (!isoString) return "";
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
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [action, setAction] = useState(Status.SHOWALL); // Mặc định hiển thị tất cả chuyến bay

  useEffect(() => {
    fetchFlights(); // Tải danh sách chuyến bay khi component mount
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get("/flights/"); // Endpoint lấy tất cả chuyến bay
      setFlightList(response);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách chuyến bay:", error);
      toast.error("Lỗi khi lấy danh sách chuyến bay!");
    }
  };

  const handleSaveFlight = async (updatedFlight) => {
    try {
      // Chuẩn bị payload chỉ với các trường cần cập nhật
      // Các trường không thay đổi sẽ được lấy từ `updatedFlight` (giá trị ban đầu)
      const payload = {
        scheduled_departure: updatedFlight.scheduled_departure,
        scheduled_arrival: updatedFlight.scheduled_arrival,
        // Nếu API của bạn yêu cầu các trường khác dù không đổi,
        // hãy thêm chúng vào payload từ updatedFlight để tránh lỗi.
        // Ví dụ:
        flight_number: updatedFlight.flight_number,
        origin_airport_id: updatedFlight.origin_airport_id,
        destination_airport_id: updatedFlight.destination_airport_id,
        status: updatedFlight.status,
        base_price: parseFloat(updatedFlight.base_price), // Đảm bảo là số
        available_seats: parseInt(updatedFlight.available_seats, 10), // Đảm bảo là số nguyên
      };

      const response = await axios.put(
        `/admin/flights/${updatedFlight._id}/delay`, // Endpoint cập nhật chuyến bay
        payload
      );

      // Cập nhật danh sách chuyến bay trong state
      // Quan trọng: Sử dụng `flight` gốc để giữ lại thông tin airport_code nếu API chỉ trả về ID
      const updatedList = flightList.map((flight) =>
        flight._id === updatedFlight._id
          ? {
              ...flight, // Giữ lại tất cả các thuộc tính của chuyến bay gốc
              scheduled_departure:
                response.scheduled_departure ||
                updatedFlight.scheduled_departure,
              scheduled_arrival:
                response.scheduled_arrival || updatedFlight.scheduled_arrival,
              status: response.status || flight.status, // Cập nhật status nếu API trả về status mới
              base_price: response.base_price || flight.base_price, // Cập nhật price nếu API trả về
              available_seats:
                response.available_seats || flight.available_seats, // Cập nhật seats nếu API trả về
              // origin_airport_id và destination_airport_id không thay đổi ở đây
              // vì chúng ta không cho phép sửa chúng trong FlightResult và giữ nguyên từ flight gốc
            }
          : flight
      );

      setFlightList(updatedList);
      toast.success("Lưu chuyến bay thành công!");
      setAction(Status.SHOWALL); // Trở về trạng thái hiển thị tất cả sau khi lưu
    } catch (error) {
      console.error("Lỗi khi lưu chuyến bay:", error);
      toast.error("Lỗi khi lưu chuyến bay!");
    }
  };

  const handleEditFlight = (flight) => {
    // Hàm hỗ trợ để định dạng datetime cho input type="datetime-local"
    const formatDateTimeForInput = (isoString) => {
      if (!isoString) return "";
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    // Chuẩn bị dữ liệu chuyến bay để truyền vào FlightResult
    // Đảm bảo origin_airport_id và destination_airport_id là chuỗi để hiển thị
    const formattedFlight = {
      _id: flight._id,
      flight_number: flight.flight_number,
      // Lấy airport_code nếu có, nếu không thì dùng ID
      origin_airport_id:
        flight.origin_airport_id?.airport_code || flight.origin_airport_id,
      destination_airport_id:
        flight.destination_airport_id?.airport_code ||
        flight.destination_airport_id,
      scheduled_departure: formatDateTimeForInput(flight.scheduled_departure),
      scheduled_arrival: formatDateTimeForInput(flight.scheduled_arrival),
      status: flight.status,
      base_price: flight.base_price,
      available_seats: flight.available_seats,
    };

    setSelectedFlight(formattedFlight);
    setAction(Status.SEARCH); // Chuyển sang chế độ chỉnh sửa
  };

  const handleDeleteFlight = async (flightId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa chuyến bay này?")) {
      try {
        await axios.delete(`/admin/flights/${flightId}`); // Endpoint xóa chuyến bay
        setFlightList(flightList.filter((flight) => flight._id !== flightId));
        toast.success("Xóa chuyến bay thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa chuyến bay:", error);
        toast.error("Lỗi khi xóa chuyến bay!");
      }
    }
  };

  // Hàm này có thể được truyền cho AddFlight để cập nhật danh sách sau khi thêm
  const handleAddFlight = async (newFlight) => {
    // Bạn cần implement logic thêm chuyến bay ở đây và sau đó fetchFlights() lại
    // hoặc thêm chuyến bay mới vào flightList
    try {
      fetchFlights(); // Tải lại danh sách để hiển thị chuyến bay mới
      setAction(Status.SHOWALL);
    } catch (error) {
      console.error("Lỗi khi thêm chuyến bay:", error);
      toast.error("Lỗi khi thêm chuyến bay!");
    }
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
                  <th className="action-header">Edit</th>
                  <th className="action-header">Delete</th>
                </tr>
              </thead>
              <tbody>
                {flightList.map((flight, index) => (
                  <tr key={flight?._id || index}>
                    <td>{index + 1}</td>
                    <td>{flight.flight_number || flight._id}</td>
                    <td>
                      {/* Hiển thị airport_code nếu có, nếu không thì hiển thị ID */}
                      {flight.origin_airport_id?.airport_code ||
                        flight.origin_airport_id}
                    </td>
                    <td>
                      {/* Hiển thị airport_code nếu có, nếu không thì hiển thị ID */}
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
                        style={{
                          backgroundColor: "#4CAF50",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          marginRight: "5px",
                          borderRadius: "3px",
                          cursor: "pointer",
                        }}
                      >
                        EDIT
                      </button>
                    </td>
                    <td className="action-cell">
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteFlight(flight._id)}
                        style={{
                          backgroundColor: "#f44336", // Màu đỏ cho nút Delete
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "3px",
                          cursor: "pointer",
                        }}
                      >
                        DELETE
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
