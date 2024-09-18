// 미용 예약 페이지
import React from 'react';
import { useParams } from 'react-router-dom';

function BeautyReserPage() {
  const { hospitalId } = useParams();

  return (
    <div>
      <h1>미용 예약</h1>
      <p>병원 ID: {hospitalId}</p>
      {/* 예약 폼을 여기에 추가 */}
    </div>
  );
}

export default BeautyReserPage;
