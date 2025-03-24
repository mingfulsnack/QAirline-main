import React from 'react'
import "./Header.scss"

function NotExistFlight() {
  return (
    <div className='notExistFlight'>
      <div className="content">
        <h2>Không tìm thấy dữ liệu</h2>
        <div className='findingBut'>
          <button>Quay lại</button>
        </div>
      </div>
    </div>
  )
}

export default NotExistFlight