import React from "react";

function ConfirmCancel() {
  return (
    <div className="requestCancel confirmCancel">
      <div className="header">
        <h2 className="blue">XÁC NHẬN HỦY ĐẶT CHỖ</h2>
      </div>
      <div className="content">
        <div className="code">
          <p className="blue">Mã đặt chỗ: ABC123</p>
        </div>
        <div className="box">
          <div className="box1">
            <p>Hành khách</p>
            <p className="blue">NGUYỄN VĂN A</p>
          </div>
          <div className="box2">
            <p>Số vé</p>
            <p className="blue">123456789</p>
          </div>
          <div className="box3">
            <p>Hành trình chọn hủy</p>
            <p className="blue">THÀNH PHỐ HỒ CHÍ MINH (SGN) - HÀ NỘI (HAN)</p>
          </div>
        </div>
        <div className="select">
          <p className="blue">
            Quý khách chắc chắn với các hành trình hủy đặt chỗ chưa?
          </p>
          {/* <div className='findingBut no'>
            <button>Điều chỉnh</button>
          </div> */}
          <div className="findingBut yes">
            <button >Tiếp tục</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmCancel;
