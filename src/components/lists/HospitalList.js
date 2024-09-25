// HospitalList.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allHospitalAPI } from '../../api/HospitalAPICalls';
import { useNavigate } from 'react-router-dom';

function HospitalList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux 스토어에서 병원 리스트 가져오기
    const hospitals = useSelector(state => state.hospital.hospitals);

    // 컴포넌트가 마운트될 때 병원 데이터를 가져오는 액션 호출
    useEffect(() => {
        // api 호출
        // 정보들을 받았다!

        // redux로 state를 변경
        dispatch(allHospitalAPI());

    }, [dispatch]);  

    const handleCardClick = (hospitalId) => {
        navigate(`/hosdetail/${hospitalId}`); // 상세 페이지로 이동
    };

    const testHandler = () => {
        console.log(hospitals);
        
    }

    return (
        <div className="hospital-container">
            {hospitals.map((hospital) => (
                <div
                    className="hospital-card"
                    key={hospital.id}
                    onClick={() => handleCardClick(hospital.id)}
                >
                    <img src={hospital.infoImage} alt={hospital.name} className="hospital-image" />
                    <div className="hospital-list-info">
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
