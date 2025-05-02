import axios from "../../Apis/axios";
import { useEffect, useState } from "react";
import "./MyBooking.scss";
import {
  FaPlane,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaExclamationCircle,
} from "react-icons/fa";
import { IoAirplane } from "react-icons/io5";

export default function MyBooking() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("bookings/user/getBooking");
        // Kiểm tra dữ liệu trả về từ API
        if (response && Array.isArray(response)) {
          setData(response);
        } else if (response && !Array.isArray(response)) {
          // Nếu response không phải array mà là object có data
          setData(Array.isArray(response.data) ? response.data : [response]);
        } else {
          setData([]);
        }
        console.log("My bookings:", response);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err.message || "Failed to fetch bookings");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "Invalid date";
    }
  };

  const formatCurrency = (amount) => {
    if (typeof amount !== "number") return "N/A";
    return amount.toLocaleString("vi-VN") + " VND";
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "status-confirmed";
      case "completed":
        return "status-completed";
      case "cancelled":
        return "status-cancelled";
      case "pending":
        return "status-pending";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="my-booking-container">
        <div className="my-booking-loading">
          <div className="loading-spinner"></div>
          <p>Đang tải thông tin đặt vé...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-booking-container">
        <div className="my-booking-error">
          <FaExclamationCircle size={32} />
          <p>Có lỗi xảy ra: {error}</p>
          <button onClick={() => window.location.reload()}>Thử lại</button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-booking-container">
      <div className="my-booking-header">
        <IoAirplane className="header-icon" />
        <h1 className="my-booking-title">Đặt vé của tôi</h1>
        <p className="my-booking-subtitle">
          Theo dõi tất cả các chuyến bay đã đặt của bạn
        </p>
      </div>

      {!data || data.length === 0 ? (
        <div className="my-booking-empty">
          <img
            src="/api/placeholder/300/200"
            alt="No bookings"
            className="empty-image"
          />
          <h2>Không tìm thấy đặt vé nào</h2>
          <p>Bạn chưa đặt vé nào hoặc tất cả đặt vé đã hết hạn.</p>
          <button className="book-now-button">Đặt vé ngay</button>
        </div>
      ) : (
        <div className="bookings-list-container">
          <div className="bookings-count">
            <span>{data.length} đặt vé</span>
          </div>
          <ul className="my-booking-list">
            {data.map((booking, index) => (
              <li key={index || `booking-${index}`} className="my-booking-card">
                <div className="card-header">
                  <div className="booking-id">
                    <span className="label">Mã đặt vé:</span>
                    <span className="value">
                      {booking._id?.substring(0, 8) || "N/A"}
                    </span>
                  </div>
                  <div
                    className={`booking-status ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status || "Unknown"}
                  </div>
                </div>

                <div className="flight-route">
                  {booking.flight_id ? (
                    <>
                      <div className="origin">
                        <div className="airport-code">
                          {booking.flight_id.origin_airport_id?.airport_code ||
                            "N/A"}
                        </div>
                        <div className="airport-name">
                          {booking.flight_id.origin_airport_id?.airport_name ||
                            "N/A"}
                        </div>
                      </div>

                      <div className="route-line">
                        <FaPlane className="plane-icon" />
                      </div>

                      <div className="destination">
                        <div className="airport-code">
                          {booking.flight_id.destination_airport_id
                            ?.airport_code || "N/A"}
                        </div>
                        <div className="airport-name">
                          {booking.flight_id.destination_airport_id
                            ?.airport_name || "N/A"}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="no-flight-data">
                      Không có thông tin chuyến bay
                    </div>
                  )}
                </div>

                <div className="booking-details">
                  <div className="detail-item">
                    <FaCalendarAlt className="detail-icon" />
                    <div>
                      <span className="detail-label">Ngày đặt:</span>
                      <span className="detail-value">
                        {formatDate(booking.booking_date)}
                      </span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <FaMoneyBillWave className="detail-icon" />
                    <div>
                      <span className="detail-label">Tổng tiền:</span>
                      <span className="detail-value">
                        {formatCurrency(booking.total_amount)}
                      </span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <FaClock className="detail-icon" />
                    <div>
                      <span className="detail-label">Hạn hủy vé:</span>
                      <span className="detail-value">
                        {formatDate(booking.cancellation_deadline)}
                      </span>
                    </div>
                  </div>

                  {booking.flight_id?.departure_time && (
                    <div className="detail-item">
                      <FaPlane className="detail-icon" />
                      <div>
                        <span className="detail-label">Khởi hành:</span>
                        <span className="detail-value">
                          {formatDate(booking.flight_id.departure_time)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* <div className="card-footer">
                  <button className="view-details-button">Chi tiết</button>
                  {booking.status?.toLowerCase() !== "cancelled" &&
                    new Date() < new Date(booking.cancellation_deadline) && (
                      <button className="cancel-booking-button">
                        Hủy đặt vé
                      </button>
                    )}
                </div> */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
