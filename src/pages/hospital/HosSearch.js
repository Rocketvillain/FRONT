//  병원 검색 페이지
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/HosSearch.css'; // CSS 파일 연결

function HosSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const navigate = useNavigate();

  // 병원 정보를 API에서 받아오기
    useEffect(() => {
    fetch('http://localhost:8080/api/v1/hospital') // 백엔드 API 엔드포인트
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data)) {
            setHospitals(data);
            setFilteredHospitals(data);
        } else {
        console.error("Received data is not an array:", data);
        setHospitals([]);
        }
    })
    .catch(error => console.error('Error fetching hospitals:', error));
    }, []);

  // 검색어 변경 시 필터링
    const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setFilteredHospitals(hospitals); // 검색어가 없으면 전체 병원 목록 표시
    } else {
        setFilteredHospitals(hospitals.filter(hospital => 
        hospital.name.toLowerCase().includes(e.target.value.toLowerCase())
    ));
    }
};

  // 병원 카드 클릭 시 상세 페이지로 이동
    const handleCardClick = (hospitalId) => {
    navigate(`/hosdetail/${hospitalId}`); // 병원 상세 페이지로 이동
    };

    return (
    <div className="hos-search-container">
        <h1>예약할 병원의 이름을 검색해주세요!</h1>
        <div className="search-bar">
        <input
            type="text"
            placeholder="병원 이름을 입력하세요"
            value={searchTerm}
            onChange={handleSearch}
        />
        <button>
          <i className="fa fa-search"></i> {/* 검색 아이콘 */}
        </button>
        </div>
        <div className="search-results">
        {filteredHospitals.map(hospital => (
            <div key={hospital.id} className="search-result-card">
            <p>{hospital.name}</p>
            </div>
        ))}
        </div>
    </div>
    );
}

export default HosSearch;
