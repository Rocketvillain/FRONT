import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allHospitalAPI } from '../../api/HospitalAPICalls';
import { useNavigate } from 'react-router-dom';
import '../../css/HosReser.css';

function HosReser() {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [filteredHospitals, setFilteredHospitals] = useState([]); // 필터링된 병원 리스트 상태
  const [selectedIndex, setSelectedIndex] = useState(-1); // 현재 선택된 목록 인덱스
  const dispatch = useDispatch();
  const navigate = useNavigate();

    // Redux 스토어에서 병원 리스트 가져오기
    const hospitals = useSelector(state => state.hospital.hospitals);

    // 컴포넌트가 마운트될 때 병원 데이터를 가져오는 액션 호출
    useEffect(() => {
        dispatch(allHospitalAPI()); // 병원 목록 불러오기
    }, [dispatch]);

    // 검색어가 변경될 때마다 병원 리스트 필터링
    useEffect(() => {
      if (searchTerm) {
          const filtered = hospitals.filter(hospital =>
              hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) // 병원 이름 필터링
          );
          setFilteredHospitals(filtered); // 필터링된 병원 리스트 업데이트
      } else {
          setFilteredHospitals([]); // 검색어가 없으면 리스트 초기화
      }
      setSelectedIndex(-1); // 새로운 검색이 발생하면 인덱스 초기화
  }, [searchTerm, hospitals]);

  // 병원 선택 시 검색창에 병원 이름 입력 및 목록 숨기기
  const handleSelectHospital = (hospitalName) => {
      setSearchTerm(hospitalName); // 선택된 병원 이름을 검색창에 입력
      setFilteredHospitals([]); // 자동완성 목록 숨기기
      document.querySelector('.hos-reser-input').focus(); // 검색창에 포커스 설정
  };

    // 병원 검색 (엔터 또는 검색 버튼 클릭 시)
    const handleSearch = () => {
        const selectedHospital = hospitals.find(hospital =>
            hospital.name.toLowerCase() === searchTerm.toLowerCase()
        );
        if (selectedHospital) {
            navigate(`/hosdetail/${selectedHospital.hosId}`); // 병원 상세 페이지로 이동
        }
    };

    // 키보드 화살표 및 엔터 처리
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
          // 아래 화살표로 탐색
          setSelectedIndex(prevIndex => Math.min(prevIndex + 1, filteredHospitals.length - 1));
      } else if (e.key === 'ArrowUp') {
          // 위 화살표로 탐색
          setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0));
      } else if (e.key === 'Enter') {
          // 엔터를 눌렀을 때
          if (selectedIndex >= 0 && filteredHospitals[selectedIndex]) {
              handleSelectHospital(filteredHospitals[selectedIndex].name); // 선택된 항목 자동완성
          } else {
              handleSearch(); // 검색 실행
          }
      }
  };

  return (
    <div className="hos-reser-container">
      <div className="search-background">
            <h1 className="hos-reser-title">예약할 병원의 이름을 검색해주세요!</h1>
            <div className="hos-reser-search-bar">
                <input
                    type="text"
                    placeholder="병원 이름을 입력하세요"
                    className="hos-reser-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // 검색어 입력 처리
                    onKeyDown={handleKeyDown} // 엔터 키 처리
                />
                <img
                    src="/images/search1.png"
                    alt="검색 버튼"
                    className="search-icon"
                    onClick={handleSearch} // 검색 버튼 클릭 처리
                />
            </div>
            {/* 검색어 입력 시 필터링된 병원 리스트를 보여줌 */}
            {filteredHospitals.length > 0 && (
                <ul className="hos-reser-search-results">
                    {filteredHospitals.map((hospital, index) => (
                        <div
                            key={hospital.hosId}
                            onClick={() => handleSelectHospital(hospital.name)} // 병원 선택 시 이름 자동완성
                            className={`hos-reser-search-result-item ${index === selectedIndex ? 'selected' : ''}`} // 선택된 항목에 하이라이트
                        >
                            {hospital.name} - {hospital.address}
                        </div>
                    ))}
                </ul>
            )}
            </div>
        </div>
  );
}

export default HosReser;
