import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/HosReser.css"; // CSS 파일 연결

function HosReser() {
  const [reserTerm, setReserTerm] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const navigate = useNavigate();

  // 병원 정보를 API에서 받아오기
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/hospital") // 백엔드 API 엔드포인트
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHospitals(data);
          setFilteredHospitals(data);
        } else {
          console.error("Received data is not an array:", data);
          setHospitals([]);
        }
      })
      .catch((error) => console.error("Error fetching hospitals:", error));
  }, []);

  // 검색어 변경 시 필터링
  const handleReser = (e) => {
    setReserTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredHospitals(hospitals); // 검색어가 없으면 전체 병원 목록 표시
    } else {
      setFilteredHospitals(
        hospitals.filter((hospital) =>
          hospital.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  // 이미지 클릭 시 필터링 실행
  const handleSearchClick = () => {
    if (reserTerm === "") {
      setFilteredHospitals(hospitals); // 검색어가 없으면 전체 병원 목록 표시
    } else {
      setFilteredHospitals(
        hospitals.filter((hospital) =>
          hospital.name.toLowerCase().includes(reserTerm.toLowerCase())
        )
      );
    }
  };

  // 병원 카드 클릭 시 상세 페이지로 이동
  const handleCardClick = (hospitalId) => {
    navigate(`/hosdetail/${hospitalId}`); // 병원 상세 페이지로 이동
  };

  return (
    <div className="hos-reser-container">
      <div className="search-background">
        <h1 className="hos-reser-title">예약할 병원의 이름을 검색해주세요!</h1>
        <div className="reser-bar">
          <input
            type="text"
            placeholder="병원 이름을 입력하세요"
            value={reserTerm}
            onChange={handleReser}
            className="reser-input"
          />
          <img
            src="/images/search1.png" // 검색 버튼 이미지 경로 (이미지 경로는 실제 파일 경로로 수정)
            alt="검색 버튼"
            className="search-icon"
            onClick={handleSearchClick} // 이미지 클릭 시 검색 실행
          />
        </div>
      </div>
      <div className="reser-results">
        {filteredHospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="reser-result-card"
            onClick={() => handleCardClick(hospital.id)}
          >
            <p>{hospital.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HosReser;
