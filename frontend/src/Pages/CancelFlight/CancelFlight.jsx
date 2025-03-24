import React, { useState } from "react";
import "./CancelFlight.scss";
import RequestCancel from "./RequestCancel";
import ConfirmCancel from "./ConfirmCancel";
import ConfirmOTP from "./ConfirmOTP";
import NotExistFlight from "../../CommonComponents/NotExistFlight";
import axios from "../../Apis/axios";

function CancelFlight() {
  const [formData, setFormData] = useState({
    bookingId: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showNotExist, setShowNotExist] = useState(false);
  const [selectedCancellations, setSelectedCancellations] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   const validateForm = () => {
  //     if (!formData.bookingId || !formData.email || !formData.phone) {
  //       setError("Vui lòng điền đầy đủ thông tin");
  //       return false;
  //     }
  //     return true;
  //   };

  const handleSearch = async () => {
    // if (!validateForm()) return;

    setLoading(true);
    setError(null);
    try {
      const searchResponse = await axios.get("/bookings/searchBooking", {
        params: {
          bookingId: formData.bookingId,
          email: formData.email,
        },
      });

      if (searchResponse) {
        setBookingDetails(searchResponse);
        setShowConfirmation(true);
        setShowNotExist(false);
      } else {
        setShowNotExist(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Có lỗi xảy ra khi tìm kiếm đặt chỗ"
      );
      setShowNotExist(true);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmCancellation = () => {
    setShowConfirmation(false);
    setShowOTP(true);
  };

  //   const handleResendOTP = async () => {
  //     try {
  //       await axios.post('/api/bookings/resendOTP', {
  //         bookingId: formData.bookingId,
  //         email: formData.email
  //       });
  //       alert('Mã OTP đã được gửi lại');
  //     } catch (err) {
  //       setError(err.response?.data?.message || "Không thể gửi lại mã OTP");
  //     }
  //   };

  const handleOTPConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.patch(`/bookings/${bookingDetails._id}/cancel`);
      console.log(res);
      if (res.status === 200) {
        alert("Huỷ đặt chỗ thành công");
      }
      //   if (otp === "123") {
      //     setShowOTP(false);
      //     alert("Huỷ đặt chỗ thành công");
      //   }
      // Redirect or show success message
    } catch (err) {
      setError(err.response?.data?.message || "Không thể huỷ đặt chỗ");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.patch(`/bookings/${formData.bookingId}/cancel`);
      // Hiển thị thông báo thành công
      setShowConfirmation(false);
      // Có thể thêm một state để hiển thị thông báo thành công
    } catch (err) {
      setError(err.response?.data?.message || "Không thể huỷ chuyến bay");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flightInfo">
      <h1 className="title">Huỷ đặt chỗ</h1>
      <div className="content">
        <button className="buttop">Mã đặt chỗ/Số vé điện tử</button>
        <div className="content-fill">
          <div className="input-area">
            <input
              type="text"
              name="bookingId"
              value={formData?.bookingId}
              onChange={handleInputChange}
              placeholder=" "
            />
            <label>Mã đặt chỗ/Số vé điện tử</label>
          </div>
          <div className="input-area">
            <input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              placeholder=" "
            />
            <label>Email</label>
          </div>
          <div className="input-area">
            <input
              type="tel"
              name="phone"
              value={formData?.phone}
              onChange={handleInputChange}
              placeholder=" "
            />
            <label>Số điện thoại</label>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="findingBut">
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Đang xử lý..." : "Tiếp tục"}
          </button>
        </div>
      </div>

      {showConfirmation && bookingDetails && (
        <RequestCancel
          bookingDetails={bookingDetails}
          onConfirm={handleConfirmCancellation}
          onClose={() => setShowConfirmation(false)}
        />
      )}

      {showOTP && (
        <ConfirmOTP
          email={formData?.email}
          onConfirm={handleOTPConfirm}
          onClose={() => setShowOTP(false)}
          //   onResendOTP={handleResendOTP}
        />
      )}

      {showNotExist && <NotExistFlight />}
    </div>
  );
}

export default CancelFlight;
