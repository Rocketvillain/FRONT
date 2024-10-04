import React, { useState } from 'react';
import '../../css/admin/ReserControl.css'; // CSS 파일을 추가합니다.

function ReserControl() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState(''); // 선택한 진료 유형
    const [currentPage, setCurrentPage] = useState(1);
    const [searchClicked, setSearchClicked] = useState(false); // 검색 버튼을 클릭했는지 여부
    const itemsPerPage = 5; // 한 페이지에 보여줄 항목 수

    // 더미 데이터 (예약 정보)
    const reservations = [
        { id: '001', userId: 'ohgiraffers', hospital: 'Bear동물병원', name: '권순혁', date: '2024/09/28', petName: '아리', type: '진료', status: '승인' },
        { id: '002', userId: 'hospital', hospital: '강아지 동물병원', name: '박호찬', date: '2024/10/20', petName: '오리', type: '수술', status: '취소' },
        { id: '003', userId: 'hospizza', hospital: '야옹이 동물병원', name: '지동혁', date: '2024/09/13', petName: '우리', type: '진료', status: '취소요청' },
        { id: '004', userId: 'user123', hospital: '맞아용 동물병원', name: '박말숙', date: '2024/09/10', petName: '나리', type: '진료', status: '승인' },
        { id: '005', userId: 'kingwe', hospital: '몰라용 동물병원', name: '박사장', date: '2024/10/01', petName: '가린이', type: '미용', status: '취소' },
        { id: '006', userId: 'queenkim', hospital: '로켓단 동물병원', name: '오목곰', date: '2024/10/22', petName: '가람이', type: '진료', status: '승인' },
        { id: '007', userId: 'jackyang', hospital: '악동 동물병원', name: '양하윤', date: '2024/09/17', petName: '종이', type: '수술', status: '승인' },
    ];

    // 진료 유형 목록
    const types = ['모든 유형', '진료', '수술', '미용'];

    // 검색 및 필터 처리 (검색 버튼을 눌렀을 때만 필터 적용)
    const filteredReservations = searchClicked
        ? reservations.filter(reservation => {
            const matchesSearchTerm = reservation.userId.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedType === '' || selectedType === '모든 유형' || reservation.type === selectedType;
            return matchesSearchTerm && matchesType;
        })
        : reservations; // 검색 버튼을 누르기 전에는 전체 목록을 보여줌

    // 페이지네이션 계산
    const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReservations = filteredReservations.slice(indexOfFirstItem, indexOfLastItem);

    // 검색어 변경 처리
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setSearchClicked(false); // 검색어가 변경되면 검색이 자동으로 적용되지 않도록 설정
    };

    // 진료 유형 선택 처리
    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setCurrentPage(1); // 진료 유형 변경 시 첫 페이지로 이동
        setSearchClicked(false); // 진료 유형이 변경되면 검색이 자동으로 적용되지 않도록 설정
    };

    // 검색 버튼 클릭 처리
    const handleSearchClick = () => {
        setSearchClicked(true);
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
    };

    // 엔터키로 검색 처리
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="reser-control-container">
            <h2 className="reser-control-title">예약 현황</h2>
            <div className="reser-control-header">
                <div className="reser-control-hospital-select">
                    <label htmlFor="type">병원:</label>
                    <select id="type" value={selectedType} onChange={handleTypeChange}>
                        {types.map(type => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="reser-control-search">
                    <input
                        type="text"
                        className="reser-control-search-input"
                        placeholder="아이디로 검색"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button className="reser-control-search-button" onClick={handleSearchClick}>검색</button>
                </div>
            </div>

            <table className="reser-control-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>아이디</th>
                        <th>병원</th>
                        <th>예약자</th>
                        <th>예약 날짜</th>
                        <th>펫 이름</th>
                        <th>유형</th>
                        <th>예약 상태</th>
                    </tr>
                </thead>
                <tbody>
                    {currentReservations.length > 0 ? (
                        currentReservations.map((reservation, index) => (
                            <tr key={reservation.id}>
                                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td>{reservation.userId}</td>
                                <td>{reservation.hospital}</td>
                                <td>{reservation.name}</td>
                                <td>{reservation.date}</td>
                                <td>{reservation.petName}</td>
                                <td>{reservation.type}</td>
                                <td className={`reser-control-status ${reservation.status === '취소요청' || reservation.status === '취소' ? 'canceled' : reservation.status === '승인' ? 'approved' : ''}`}>
                                    {reservation.status}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">예약 정보가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="reser-control-pagination">
                <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                    ◀
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? 'reser-control-active-page' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                    ▶
                </button>
            </div>
        </div>
    );
}

export default ReserControl;
