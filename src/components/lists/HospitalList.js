// HospitalList.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allHospitalAPI } from '../../api/HospitalAPICalls';
import { useNavigate } from 'react-router-dom';

function HospitalList({ searchTerm }) {
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

    const handleCardClick = (hosId) => {
        navigate(`/hosdetail/${hosId}`); // 상세 페이지로 이동
    };

    // 필터링된 병원 리스트 상태 관리
    const filteredHospitals = hospitals.filter(hospital => 
        hospital.name.includes(searchTerm) || // 병원 이름에 검색어가 포함되는지 확인
        hospital.address.includes(searchTerm) // 주소에 검색어가 포함되는지 확인
        // hospital.cType.includes(searchTerm)
    );

    return (
        <div className="hospital-list-container">
            {filteredHospitals.length > 0 ? (
                filteredHospitals.map((hospital) => (
                <div
                    className="hospital-list-card"
                    key={hospital.hosId}
                    onClick={() => handleCardClick(hospital.hosId)}
                >
                    <img src={hospital.infoImage} alt={hospital.name} className="hospital-list-image" />
                    <div className="hospital-list-info">
                        <p>{hospital.address}</p>
                    </div>
                    <div className="hospital-list-name">
                        <h3>{hospital.name}</h3>
                    </div>
                </div>
            ))
        ) : (
            <p>검색된 병원이 없습니다.</p>
        )}
        </div>
    );
}

export default HospitalList;
