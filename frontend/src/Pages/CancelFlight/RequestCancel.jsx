import React, { useState } from "react";
import PropTypes from "prop-types";

function RequestCancel({ bookingDetails, onConfirm, onClose }) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(false);

  const handleConfirm = () => {
    if (!acceptedTerms || !selectedBooking) {
      alert("Vui lòng chọn đầy đủ thông tin và chấp nhận điều khoản");
      return;
    }
    onConfirm({
      bookingId: bookingDetails?._id,
      guestInfo: bookingDetails?.guest_info,
    });
  };
  console.log(bookingDetails);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div className="requestCancel">
      <div className="header">
        <h2 className="blue">YÊU CẦU HỦY ĐẶT CHỖ</h2>
      </div>
      <div className="content">
        <div className="code">
          <p className="blue">Mã đặt chỗ: {bookingDetails?._id}</p>
        </div>
        <div className="customer box">
          <input
            type="checkbox"
            checked={selectedBooking}
            onChange={(e) => setSelectedBooking(e.target.checked)}
          />
          <div className="left">
            <p>Hành khách</p>
            <p className="blue">
              {bookingDetails?.guest_info?.full_name
                ? bookingDetails?.guest_info.full_name
                : bookingDetails.userId}
            </p>
          </div>
          <div className="right">
            <p>Ngày đặt</p>
            <p className="blue">{formatDate(bookingDetails?.booking_date)}</p>
          </div>
        </div>
        <div className="journey box">
          <input
            type="checkbox"
            checked={selectedBooking}
            onChange={(e) => setSelectedBooking(e.target.checked)}
          />
          <div>
            <p className="blue">Thông tin đặt chỗ</p>
            <p>
              Số tiền: {bookingDetails?.total_amount.toLocaleString("vi-VN")}{" "}
              VND
            </p>
            <p>Hạn huỷ: {formatDate(bookingDetails?.cancellation_deadline)}</p>
            <p>Email: {bookingDetails?.guest_info?.email}</p>
            <p>SĐT: {bookingDetails?.guest_info?.phone}</p>
          </div>
        </div>
        <div className="acpt box">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <p>Chấp nhận điều khoản hủy chỗ</p>
        </div>
        <div className="findingBut">
          <button onClick={handleConfirm}>Tiếp tục</button>
        </div>
      </div>
    </div>
  );
}
RequestCancel.propTypes = {
  bookingDetails: PropTypes.shape({
    _id: PropTypes.string,
    guest_info: PropTypes.shape({
      full_name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
    }),

    userId: PropTypes.string,
    booking_date: PropTypes.string,
    total_amount: PropTypes.number,
    cancellation_deadline: PropTypes.string,
  }),
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default RequestCancel;
