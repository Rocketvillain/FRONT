// 병원 상세 정보 페이지

import '../../css/HosDetails.css';
import React, { useEffect } from 'react';
import { hospitalDetailAPI } from '../../api/HospitalAPICalls';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HosDetails() {

  const dispatch = useDispatch();

  const { hosId } = useParams();

  const navigate = useNavigate();

  // useSelector에서 state를 불러온 것.
  const hospital = useSelector(state => state.hospital.hospital); 
  
    const handleReservationClick = (type) => {
    if (type === 'reserpage') {
      navigate(`/reserpage/${hosId}`);
    } else if (type === 'beautyreserpage') {
      navigate(`/beautyreserpage/${hosId}`);
    }
  };

  // 컴포넌트가 마운트될 때 병원 데이터를 가져오는 액션 호출
  useEffect(() => {
    // api 호출
    // 정보들을 받았다!

    // redux로 state를 변경
    dispatch(hospitalDetailAPI(hosId));

  }, [dispatch]); 

  
  return (
    <div className="hos-detail">
      <h1>{hospital.name}</h1>
      <p>{hospital.address}</p>
      <h4>{hospital.info}</h4>
      {/* <h4>{hospital.clinicName} 가능</h4> */}
      <img src={hospital.ownerImage} alt={hospital.ownerName} className="ownerImage-image" />
      <h4>{hospital.ownerName}</h4>

      <div className="reservation-buttons">
        <button onClick={() => handleReservationClick('reserpage')}>진료 및 수술 예약</button>
        <button onClick={() => handleReservationClick('beautyreserpage')}>미용 예약</button>
      </div>
    </div>
  );
}

export default HosDetails;
