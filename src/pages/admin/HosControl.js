import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allHospitalAPI } from '../../api/HospitalAPICalls'; // 병원 조회 API
import { adminUpdateHospitalAPI, adminDeleteHospitalAPI } from '../../api/AdminAPICalls'; // 병원 수정 및 삭제 API
import '../../css/admin/HosControl.css';

function HosControl() {
    const dispatch = useDispatch();
    const hospitals = useSelector((state) => state.hospital.hospitals); // 병원 목록을 Redux에서 가져옴
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const hospitalsPerPage = 10; // 한 페이지에 보여줄 병원 수
    const [filteredHospitals, setFilteredHospitals] = useState(hospitals); // 필터링된 병원 목록
    const [editingId, setEditingId] = useState(null); // 수정 중인 병원의 ID
    const [updatedHospitalName, setUpdatedHospitalName] = useState(''); // 병원 이름 수정 상태
    const [updatedHospitalAddress, setUpdatedHospitalAddress] = useState(''); // 병원 주소 수정 상태
    const [updatedOwnerName, setUpdatedOwnerName] = useState(''); // 병원장 수정 상태
    const totalPages = Math.ceil(filteredHospitals.length / hospitalsPerPage); // 총 페이지 수 계산

    useEffect(() => {
        dispatch(allHospitalAPI());
    }, [dispatch]);

    useEffect(() => {
        setFilteredHospitals(hospitals); // 검색되지 않은 상태에서는 전체 병원 표시
    }, [hospitals]);

    // 검색 처리
    const handleSearch = () => {
        const filtered = hospitals.filter(hospital =>
            hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredHospitals(filtered); // 검색어에 맞는 병원 필터링
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

    // 페이지 변경 처리
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
    const handleEditClick = (hosId, name, address, ownerName) => {
        setEditingId(hosId); // 수정 모드로 전환
        setUpdatedHospitalName(name); // 수정할 병원 이름 설정
        setUpdatedHospitalAddress(address); // 수정할 병원 주소 설정
        setUpdatedOwnerName(ownerName); // 수정할 병원장 이름 설정
    };

    // 수정 완료 시 병원 정보를 백엔드에 업데이트하는 함수 (PUT API 사용)
    const handleSaveClick = (hosId) => {
        const selectedHospital = hospitals.find(hospital => hospital.hosId === hosId);

        const updatedHospital = {
            name: updatedHospitalName || selectedHospital.name,
            address: updatedHospitalAddress || selectedHospital.address, 
            ownerName: updatedOwnerName || selectedHospital.ownerName, 
            clinicType: selectedHospital.clinicType, 
            businessNo: selectedHospital.businessNo,
            info: selectedHospital.info,
            infoImage: selectedHospital.infoImage,
            ownerImage: selectedHospital.ownerImage,
            createdDate: selectedHospital.createdDate,
            lastModifiedDate: new Date().toISOString(), // 현재 시간을 ISO 형식으로 저장
        };

        dispatch(adminUpdateHospitalAPI(hosId, updatedHospital)) // Redux 액션 디스패치
            .then(() => {
                setEditingId(null); // 수정 모드 해제
                dispatch(allHospitalAPI()); // 병원 목록 갱신
            })
            .catch((error) => {
                console.error('병원 정보를 수정하는 중 에러 발생:', error);
            });
    };

    // 삭제 버튼 클릭 시 병원을 백엔드에서 삭제하는 함수 (DELETE API 사용)
    const handleDeleteClick = (hosId) => {
        dispatch(adminDeleteHospitalAPI(hosId)) // hosId로 Redux 액션 디스패치
            .then(() => {
                console.log('병원 삭제 완료');
                dispatch(allHospitalAPI()); // 삭제 후 병원 목록 갱신
            })
            .catch((error) => {
                console.error('병원을 삭제하는 중 에러 발생:', error);
            });
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
                    placeholder="병원명으로 검색"
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
                        <th>병원</th>
                        <th>진료 유형</th>
                        <th>주소</th>
                        <th>병원장</th>
                        <th>사업자번호</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {currentHospitals.length > 0 ? (
                        currentHospitals.map((hospital) => (
                            editingId === hospital.hosId ? (
                                <tr key={hospital.hosId}>
                                    <td>{hospital.hosId}</td> {/* 병원 번호 */}
                                    <td>
                                        <input
                                            type="text"
                                            value={updatedHospitalName}
                                            onChange={(e) => setUpdatedHospitalName(e.target.value)}
                                            style={{ width: '100%', boxSizing: 'border-box' }} // 고정된 너비 적용
                                        /> {/* 병원 이름을 수정 가능하게 변경 */}
                                    </td>
                                    <td>
                                        {hospital.clinicType && hospital.clinicType.length > 0 ? (
                                            hospital.clinicType.map((clinic, idx) => (
                                                <div key={idx}>{clinic.clinicName}</div> // clinicName만 표시
                                            ))
                                        ) : (
                                            <div>진료 항목 없음</div>
                                        )}
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={updatedHospitalAddress}
                                            onChange={(e) => setUpdatedHospitalAddress(e.target.value)}
                                            style={{ width: '100%', boxSizing: 'border-box' }} // 고정된 너비 적용
                                        /> {/* 병원 주소를 수정 가능하게 변경 */}
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={updatedOwnerName}
                                            onChange={(e) => setUpdatedOwnerName(e.target.value)}
                                            style={{ width: '100%', boxSizing: 'border-box' }} // 고정된 너비 적용
                                        /> {/* 병원장을 수정 가능하게 변경 */}
                                    </td>
                                    <td>{hospital.businessNo}</td> {/* 사업자번호 */}
                                    <td>
                                        <button
                                            className='hos-control-save-button'
                                            onClick={() => handleSaveClick(hospital.hosId)}>
                                            저장
                                        </button> {/* 저장 버튼 */}
                                        <button className='hos-control-close-button' onClick={() => setEditingId(null)}>취소</button> {/* 취소 버튼 */}
                                    </td>
                                </tr>
                            ) :
                                <tr key={hospital.hosId}>
                                    <td>{hospital.hosId}</td> {/* 번호 */}
                                    <td>{hospital.name}</td> {/* 병원 이름 */}
                                    <td>
                                        {hospital.clinicType && hospital.clinicType.length > 0 ? (
                                            hospital.clinicType.map((clinic, idx) => (
                                                <div key={idx}>{clinic.clinicName}</div> // clinicName만 표시
                                            ))
                                        ) : (
                                            <div>진료 항목 없음</div>
                                        )}
                                    </td>
                                    <td>{hospital.address}</td> {/* 병원 주소 */}
                                    <td>{hospital.ownerName}</td> {/* 병원장 */}
                                    <td>{hospital.businessNo}</td> {/* 사업자번호 */}
                                    <td>
                                        <button className='hos-control-edit-button' onClick={() => handleEditClick(hospital.hosId, hospital.name, hospital.address, hospital.ownerName)}>수정</button>
                                        <button className='hos-control-delete-button' onClick={() => handleDeleteClick(hospital.hosId)}>삭제</button>
                                    </td>
                                </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">병원이 없습니다.</td> {/* 데이터가 없을 때 메시지 */}
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="hos-control-pagination">
                <button onClick={handleFirstPage} disabled={currentPage === 1 || filteredHospitals.length === 0}>
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
                <button onClick={handleLastPage} disabled={currentPage === totalPages || filteredHospitals.length === 0}>
                    ▶
                </button>
            </div>
        </div>
    );
}

export default HosControl;
