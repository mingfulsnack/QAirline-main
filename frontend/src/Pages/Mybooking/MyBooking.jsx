import axios from "../../Apis/axios";
import { useEffect, useState } from "react";
import "./MyBooking.scss";

export default function MyBooking() {
  const [data, setData] = useState([]); // Đổi null thành [] để tránh lỗi khi map dữ liệu
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("bookings/user/getBooking");
        setData(response); // Đảm bảo chỉ gán dữ liệu cần thiết
        console.log("My bookings:", response);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="my-booking-loading">Loading...</div>;
  if (error) return <div className="my-booking-error">Error: {error}</div>;

  return (
    <div className="my-booking-container">
      <h1 className="my-booking-title">My Bookings</h1>
      {data.length === 0 ? (
        <p className="my-booking-empty">No bookings found.</p>
      ) : (
        <ul className="my-booking-list">
          {data.map((booking, index) => (
            <li key={index} className="my-booking-card">
              <h2 className="my-booking-flight">BookingID: {booking._id}</h2>
              <p className="my-booking-date">
                <strong>Booking Date:</strong>{" "}
                {new Date(booking.booking_date).toLocaleString()}
              </p>
              <p className="my-booking-status">
                <strong>Status:</strong> {booking.status}
              </p>
              <p className="my-booking-amount">
                <strong>Total Amount:</strong>{" "}
                {booking.total_amount.toLocaleString()} VND
              </p>
              <p className="my-booking-deadline">
                <strong>Cancellation Deadline:</strong>{" "}
                {new Date(booking.cancellation_deadline).toLocaleString()}
              </p>
              <p className="my-booking-origin">
                <strong>Origin Airport:</strong>{" "}
                {booking.flight_id.origin_airport_id.airport_name}
              </p>
              <p className="my-booking-destination">
                <strong>Destination Airport:</strong>{" "}
                {booking.flight_id.destination_airport_id.airport_name}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
