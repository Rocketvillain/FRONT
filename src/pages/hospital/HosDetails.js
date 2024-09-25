// 병원 상세 정보 페이지

import React, { useEffect } from 'react';
import { allHospitalAPI } from '../../api/HospitalAPICalls';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HosDetails() {

  const dispatch = useDispatch();

  const { hospitalId } = useParams(); // URL에서 병원 ID를 가져옴
  const navigate = useNavigate();

  const hospitals = useSelector(state => state.hospital.hospitals); 

  const hospital = hospitals;
  
    const handleReservationClick = (type) => {
    if (type === 'reserpage') {
      navigate(`/reserpage/${hospitalId}`);
    } else if (type === 'beautyreserpage') {
      navigate(`/beautyreserpage/${hospitalId}`);
    }
  };

  // 컴포넌트가 마운트될 때 병원 데이터를 가져오는 액션 호출
  useEffect(() => {
    // api 호출
    // 정보들을 받았다!

    // redux로 state를 변경
    dispatch(allHospitalAPI());

  }, [dispatch]); 

  
  return (
    <div className="hos-detail">
        <div className="hospital-name">
                        <h3>{hospital.name}</h3>
                    </div>
      <h1>병원 이름</h1>
      <p>서울특별시 강남구 청담동 125-14</p>
      <div className="reservation-buttons">
        <button onClick={() => handleReservationClick('treatment')}>진료 및 수술 예약</button>
        <button onClick={() => handleReservationClick('grooming')}>미용 예약</button>
      </div>
    </div>
  );
}

export default HosDetails;
