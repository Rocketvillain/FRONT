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
  const hospital = useSelector(state => state.hospital.hospital); 
  
  // 컴포넌트가 마운트될 때 병원 데이터를 가져오는 액션 호출
  useEffect(() => {
    // api 호출-정보들을 받았다!

    // redux로 state를 변경
    dispatch(hospitalDetailAPI(hosId));
  }, [dispatch]); 

  const handleReservationClick = (type) => {
    if (type === 'reserpage') {
      navigate(`/reserpage/${hosId}`); 
    } else if (type === 'beautyreserpage') {
      navigate(`/beautyreserpage/${hosId}`);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // 브라우저 히스토리에서 이전 페이지로 이동
  };

  return (
    <div className="hos-detail-container">
      <div className='hos-details-logo'>
        <span id='hos-details-healingPets'>Healing Pets🍃</span>
      </div>

      <div className="hos-details-header">
        <img src={`/${hospital.ownerImage}`} alt={hospital.ownerName} className="hos-details-owner-image" />
        <div className="hos-details-text">
          <h1 className="hos-details-hospital-name">병원명 | {hospital.name}</h1>
          <h3 className="hos-details-owner-name">{hospital.ownerName}</h3>
        </div>
      </div>

      <div className="hos-details-hospital-info">
        <h4>"{hospital.info}"</h4>
      </div>
      <div className="hos-details-hospital-address">
        <h3>주소&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{hospital.address}</h3>
      </div>

      <div className="reservation-buttons">
        <button onClick={() => handleReservationClick('reserpage')}>진료 및 수술 예약</button>
        <button onClick={() => handleReservationClick('beautyreserpage')}>미용 예약</button>
      </div>

      <button className="hospital-details-back-button" onClick={handleBackClick}>↩</button>
    </div>
  );
}

export default HosDetails;