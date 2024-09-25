import React, { useState, useEffect } from 'react';
import '../../css/admin/HosControl.css'; // CSS 파일을 추가합니다.

function HosControl() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const hospitalsPerPage = 5; // 한 페이지에 보여줄 병원 수
    const [isSearching, setIsSearching] = useState(false);
    
    // 로컬 스토리지에서 병원 데이터를 불러옵니다.
    const loadHospitals = () => {
        const storedHospitals = localStorage.getItem('hospitals');
        return storedHospitals ? JSON.parse(storedHospitals) : [
            { id: 1, userId: 'ohgiraffers', hospitalName: '청담동물병원', address: '서울특별시 강남구 논현동 95-16번지 논현빌딩', owner: '김정혁', businessNo: '124-45-10901' },
            { id: 2, userId: 'hospital', hospitalName: '자연동물병원', address: '서울특별시 강남구 개포동 1211번지', owner: '박호찬', businessNo: '124-45-10902' },
            { id: 3, userId: 'hospizza', hospitalName: '강남25동물병원', address: '서울특별시 강남구 논현동 90-6 로이빌딩', owner: '지동혁', businessNo: '124-45-10903' },
            { id: 4, userId: 'user123', hospitalName: '주주동물종합병원', address: '서울특별시 강남구 대치동 898-8 1층', owner: '양재민', businessNo: '124-45-10904' },
            { id: 5, userId: 'kingwe', hospitalName: '서경석동물병원', address: '서울특별시 강남구 일원동 684 남경빌딩 1층', owner: '송삼동', businessNo: '124-45-10905' },
            { id: 6, userId: 'queenkim', hospitalName: '우리집동물병원', address: '서울특별시 강남구 도곡동 180-31번지 1층', owner: '오문섭', businessNo: '124-45-10906' }
        ];
    };

    const [hospitals, setHospitals] = useState(loadHospitals);

    const [filteredHospitals, setFilteredHospitals] = useState(hospitals);
    const [editingId, setEditingId] = useState(null); // 현재 수정 중인 병원의 ID
    const totalPages = Math.ceil(filteredHospitals.length / hospitalsPerPage);

    // 병원 데이터가 변경될 때마다 로컬 스토리지에 저장합니다.
    useEffect(() => {
        localStorage.setItem('hospitals', JSON.stringify(hospitals));
        setFilteredHospitals(hospitals);
    }, [hospitals]);

    // 검색 실행 처리
    const handleSearch = () => {
        const filtered = hospitals.filter(hospital =>
            hospital.userId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredHospitals(filtered);
        setIsSearching(true); // 검색이 진행되었음을 표시
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
    };

    // Enter 키를 눌렀을 때 검색 실행
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // 검색어 변경 처리
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    // 수정 버튼 클릭 시
    const handleEditClick = (id) => {
        setEditingId(id);
    };

    // 수정 완료 버튼 클릭 시
    const handleSaveClick = (id, updatedHospital) => {
        setHospitals(hospitals.map(hospital => 
            hospital.id === id ? { ...hospital, ...updatedHospital } : hospital
        ));
        setEditingId(null); // 수정 완료 후, 수정 모드 해제
    };

    // 삭제 버튼 클릭 시
    const handleDeleteClick = (id) => {
        setHospitals(hospitals.filter(hospital => hospital.id !== id));
    };

    // 페이징 처리
    const indexOfLastHospital = currentPage * hospitalsPerPage;
    const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
    const currentHospitals = filteredHospitals.slice(indexOfFirstHospital, indexOfLastHospital);

    return (
        <div className="hos-control-container">
            <h2 className="hos-control-title">병원 관리</h2>

            <div className="hos-control-search-bar">
                <input
                    type="text"
                    className="hos-control-search-input"
                    placeholder="아이디로 검색"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress} // Enter 키 처리
                />
                <button
                    className="hos-control-search-button"
                    onClick={handleSearch} // 검색 버튼 클릭 시 검색 실행
                >
                    검색
                </button>
            </div>

            <table className="hos-control-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>아이디</th>
                        <th>병원</th>
                        <th>주소</th>
                        <th>병원장</th>
                        <th>사업자번호</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {currentHospitals.length > 0 ? (
                        currentHospitals.map((hospital, index) => (
                            <tr key={hospital.id}>
                                <td>{hospital.id}</td>
                                <td>{hospital.userId}</td>
                                <td>
                                    {editingId === hospital.id ? (
                                        <input
                                            type="text"
                                            defaultValue={hospital.hospitalName}
                                            onChange={(e) => hospital.hospitalName = e.target.value}
                                        />
                                    ) : (
                                        hospital.hospitalName
                                    )}
                                </td>
                                <td>
                                    {editingId === hospital.id ? (
                                        <input
                                            type="text"
                                            defaultValue={hospital.address}
                                            onChange={(e) => hospital.address = e.target.value}
                                        />
                                    ) : (
                                        hospital.address
                                    )}
                                </td>
                                <td>
                                    {editingId === hospital.id ? (
                                        <input
                                            type="text"
                                            defaultValue={hospital.owner}
                                            onChange={(e) => hospital.owner = e.target.value}
                                        />
                                    ) : (
                                        hospital.owner
                                    )}
                                </td>
                                <td>{hospital.businessNo}</td>
                                <td>
                                    {editingId === hospital.id ? (
                                        <button 
                                            className="hos-control-save-button" 
                                            onClick={() => handleSaveClick(hospital.id, hospital)}
                                        >
                                            저장
                                        </button>
                                    ) : (
                                        <>
                                            <button 
                                                className="hos-control-edit-button" 
                                                onClick={() => handleEditClick(hospital.id)}
                                            >
                                                수정
                                            </button>
                                            <button 
                                                className="hos-control-delete-button" 
                                                onClick={() => handleDeleteClick(hospital.id)}
                                            >
                                                삭제
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">병원이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="hos-control-pagination">
                <button onClick={handleFirstPage} disabled={currentPage === 1}>
                    ◀
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? "hos-control-active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                    ▶
                </button>
            </div>
        </div>
    );
}

export default HosControl;
