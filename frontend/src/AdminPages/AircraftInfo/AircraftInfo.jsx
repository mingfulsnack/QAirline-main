import React, { useState, useEffect } from "react";
import "./AircraftInfo.scss";
import AircraftResult from "./AircraftResult";
import AddAircraft from "./AddAircraft";
import axios from "../../Apis/axios";

const Status = {
  SEARCH: "search",
  SHOWALL: "showall",
  ADD: "add",
};

function AircraftInfo() {
  const [aircraftList, setAircraftList] = useState([""]);
  const [searchId, setSearchId] = useState("");
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [action, setAction] = useState("showall");
  //   const [editAircraft, setEditAircraft] = useState(null);

  useEffect(() => {
    const fetchAircrafts = async () => {
      try {
        const response = await axios.get("/admin/aircrafts");
        setAircraftList(response);
        console.log("Danh sách tàu bay:", response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tàu bay:", error);
      }
    };

    fetchAircrafts();
  }, []);

  const handleEdit = (aircraft) => {
    setSelectedAircraft(aircraft);

    setAction(Status.SEARCH);
  };

  // Hàm để thêm tàu bay mới
  const handleAddAircraft = (newAircraft) => {
    setAircraftList([...aircraftList, newAircraft]);
  };

  return (
    <div className="aircraftInfo">
      <div className="searchBarContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Nhập mã tàu bay để tìm kiếm"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)} // Cập nhật trạng thái khi người dùng nhập
          //   onKeyDown={handleKeyDown} // Gọi handleSearch khi nhấn Enter
        />
        {/* <button className="addButton findButton" onClick={handleSearch}>
          Tìm kiếm & Sửa
        </button> */}
        <button className="addButton" onClick={() => setAction(Status.SHOWALL)}>
          Tất cả tàu bay
        </button>
        <button className="addButton" onClick={() => setAction(Status.ADD)}>
          Thêm tàu bay
        </button>
      </div>

      {action === Status.SHOWALL && (
        <div className="aircraftTable">
          {aircraftList.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Mã tàu bay</th>
                  <th>Nhà sản xuất</th>
                  <th>Model</th>
                  <th>Số ghế</th>
                  <th>Ngày sản xuất</th>
                </tr>
              </thead>
              <tbody>
                {aircraftList.map((aircraft) => (
                  <tr key={aircraft._id}>
                    <td>
                      <button onClick={() => handleEdit(aircraft)}>Edit</button>
                    </td>
                    <td>{aircraft?.aircraft_code}</td>
                    <td>{aircraft?.manufacturer}</td>
                    <td>{aircraft?.model}</td>
                    <td>{aircraft?.total_seats}</td>
                    <td>{aircraft?.manufacture_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Chưa có tàu bay nào.</p>
          )}
        </div>
      )}

      {action === Status.ADD && (
        <AddAircraft onAddAircraft={handleAddAircraft} />
      )}

      {action === Status.SEARCH &&
        (selectedAircraft ? (
          <AircraftResult
            aircraft={selectedAircraft}
            onDelete={(id) => {
              {
                return setAircraftList((prev) =>
                  prev.filter((aircraft) => aircraft._id !== id)
                );
              }
            }}
            onUpdate={(updatedAircraft) => {
              console.log("Updated aircraft:", updatedAircraft);
              setAircraftList((prev) => {
                return prev.map((aircraft) =>
                  aircraft._id === updatedAircraft._id
                    ? updatedAircraft
                    : aircraft
                );
              });
            }}
          />
        ) : (
          <p>Không tìm thấy tàu bay.</p>
        ))}
    </div>
  );
}

export default AircraftInfo;
