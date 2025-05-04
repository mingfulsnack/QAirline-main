import React from "react";

function NotExistFlight({ onGoBack }) {
  return (
    <div className="notExistFlight">
      <div className="content">
        <h2>Không tìm thấy dữ liệu</h2>
        <div className="findingBut">
          <button onClick={onGoBack}>Quay lại</button>
        </div>
      </div>
    </div>
  );
}

export default NotExistFlight;
