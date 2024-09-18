import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HospitalList() {
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  // 병원 정보를 API에서 받아오기
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/hospital') // 백엔드 API 엔드포인트
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setHospitals(data);
        } else {
          console.error("Received data is not an array:", data);
          setHospitals([]);
        }
      })
      .catch(error => console.error('Error fetching hospitals:', error));
  }, []);

  const handleCardClick = (hospitalId) => {
    navigate(`/hospital/detail/${hospitalId}`); // 상세 페이지로 이동
  };

  return (
    <div className="hospital-container">
      {hospitals.map((hospital) => (
        <div
          className="hospital-card"
          key={hospital.id}
          onClick={() => handleCardClick(hospital.id)}
        >
          <img src={hospital.image} alt={hospital.name} className="hospital-image" />
          <div className="hospital-info">
            <p>{hospital.address}</p>
          </div>
          <div className="hospital-name">
            <h3>{hospital.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HospitalList;
