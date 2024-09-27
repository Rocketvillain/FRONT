// 병원 조회
import React from 'react';
import '../../css/HospitalList.css';
import '../../css/HospitalView.css';
import HospitalList from '../../components/lists/HospitalList';

function HospitalView() {

    return(
        <>
        <div className="hv-search-background">
            <h1 className="hv-reser-title">예약할 병원의 이름을 검색해주세요!</h1>
            <div className="hv-bar">
            <input
                type="text"
                placeholder="병원 이름을 입력하세요"
                className="hv-input"
            />
            <img
                src="/images/search1.png"
                alt="검색 버튼"
                className="hv-search-icon"
            />
            </div>
        </div>
        <HospitalList/>
        </>
    )

}

export default HospitalView;