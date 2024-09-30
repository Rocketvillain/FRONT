import React, { useState } from 'react';
import '../../css/HospitalList.css';
import '../../css/HospitalView.css';
import HospitalList from '../../components/lists/HospitalList';

function HospitalView() {
    const [searchTerm, setSearchTerm] = useState(''); // 통합된 검색어 상태

    return (
        <>
            <div className="hv-search-background">
                <h1 className="hv-reser-title">예약할 병원의 정보를 입력해주세요!</h1>
                <div className="hv-bar">
                    <input
                        type="text"
                        placeholder="병원 이름 or 주소 or 진료유형을 입력하세요"
                        className="hv-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img
                        src="/images/search1.png"
                        alt="검색 버튼"
                        className="hv-search-icon"
                    />
                </div>
            </div>
            {/* 검색어를 HospitalList에 전달 */}
            <HospitalList searchTerm={searchTerm} />
        </>
    );
}

export default HospitalView;
