// Information.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import "./Information.scss";

export default function Information() {
  const [editStates, setEditStates] = useState({
    fullName: false,
    birthDate: false,
    idNumber: false,
    nationality: false,
    phone: false,
    address: false,
  });

  const [userInfo, setUserInfo] = useState({
    fullName: "Nguyễn Văn A",
    birthDate: "01/01/1990",
    idNumber: "123456789",
    nationality: "Việt Nam",
    phone: "0123456789",
    address: "123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh",
  });

  const handleEdit = (field) => {
    setEditStates((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = (field) => {
    setEditStates((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const InfoField = ({ label, field, value }) => (
    <div className="infoField">
      <div className="fieldHeader">
        <label>{label}</label>
        <button className="editButton" onClick={() => handleEdit(field)}>
          {editStates[field] ? "Hủy" : "Chỉnh sửa"}
        </button>
      </div>
      {editStates[field] ? (
        <div className="editContainer">
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className="editInput"
          />
          <button className="saveButton" onClick={() => handleSave(field)}>
            Lưu
          </button>
        </div>
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
  InfoField.propTypes = {
    label: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  };

  return (
    <div className="informationContainer">
      <div className="section">
        <h2 className="sectionTitle">Tài khoản</h2>
        <div className="accountInfo">
          <div className="avatar">
            <img src="assets/dufen_img.png" alt="Avatar" />
            <button className="changeAvatarButton">Đổi ảnh</button>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="personalInfo">
          <InfoField
            label="Họ và tên"
            field="fullName"
            value={userInfo.fullName}
          />
          <InfoField
            label="Ngày sinh"
            field="birthDate"
            value={userInfo.birthDate}
          />
          <InfoField
            label="Số hộ chiếu/CMND"
            field="idNumber"
            value={userInfo.idNumber}
          />
          <InfoField
            label="Quốc tịch"
            field="nationality"
            value={userInfo.nationality}
          />
        </div>
      </div>

      <div className="section">
        <div className="contactInfo">
          <InfoField
            label="Số điện thoại"
            field="phone"
            value={userInfo.phone}
          />
          <InfoField label="Địa chỉ" field="address" value={userInfo.address} />
        </div>
      </div>
    </div>
  );
}
