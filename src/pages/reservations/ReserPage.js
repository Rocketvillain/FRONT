// 진료/수술 예약 페이지
import React from 'react';
import { useParams } from 'react-router-dom';

function ReserPage() {
  const { hospitalId } = useParams();

  return (
    <div>
      <h1>진료 및 수술 예약</h1>
      <p>병원 ID: {hospitalId}</p>
      {/* 예약 폼을 여기에 추가 */}
    </div>
  );
}

export default ReserPage;
