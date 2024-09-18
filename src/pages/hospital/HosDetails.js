// 병원 상세 정보 페이지

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function HosDetail() {
  const { hosId } = useParams(); // URL에서 병원 ID를 가져옴
  const navigate = useNavigate();

  const handleReservationClick = (type) => {
    if (type === 'treatment') {
      navigate(`/reservation/treatment/${hosId}`);
    } else if (type === 'grooming') {
      navigate(`/reservation/grooming/${hosId}`);
    }
  };

  return (
    <div className="hos-detail">
      <h1>병원 이름</h1>
      <p>서울특별시 강남구 청담동 125-14</p>
      <div className="reservation-buttons">
        <button onClick={() => handleReservationClick('treatment')}>진료 및 수술 예약</button>
        <button onClick={() => handleReservationClick('grooming')}>미용 예약</button>
      </div>
    </div>
  );
}

export default HosDetail;
