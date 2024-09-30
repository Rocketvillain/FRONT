import React, { useState } from 'react';
import '../../css/hosAdmin/HosReserControl.css';

function HosReserControl() {
    const [currentPage, setCurrentPage] = useState(1);
    const [reservationsPerPage] = useState(5); // 한 페이지에 표시할 예약 수
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmedSearchTerm, setConfirmedSearchTerm] = useState('');
    const [reservations, setReservations] = useState([
        { id: '001', userId: 'ohgirl***', name: '권은혜', date: '24/09/28', time: '16:00', petName: '아리', type: '미용', status: '승인' },
        { id: '002', userId: 'hosp***', name: '박호찬', date: '24/10/20', time: '12:00', petName: '오리', type: '수술', status: '승인' },
        { id: '003', userId: 'hosp***', name: '지동현', date: '24/09/13', time: '15:00', petName: '우리', type: '진료', status: '취소 요청' },
        { id: '004', userId: 'user***', name: '박성은', date: '24/09/10', time: '17:00', petName: '나리', type: '진료', status: '승인' },
        { id: '005', userId: 'king***', name: '박태근', date: '24/10/01', time: '11:00', petName: '가린이', type: '미용', status: '취소 요청' }
    ]);

    // 실시간 검색을 위한 필터링
    const filteredReservations = reservations.filter(reservation =>
        reservation.userId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 검색 버튼을 눌렀을 때 확정된 검색어로 필터링된 예약을 가져옴
    const confirmedFilteredReservations = reservations.filter(reservation =>
        reservation.userId.toLowerCase().includes(confirmedSearchTerm.toLowerCase())
    );

    // 페이지 수 계산
    const totalPages = Math.ceil((confirmedSearchTerm ? confirmedFilteredReservations : filteredReservations).length / reservationsPerPage);

    // 예약 데이터 페이지 계산
    const indexOfLastReservation = currentPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = (confirmedSearchTerm ? confirmedFilteredReservations : filteredReservations).slice(indexOfFirstReservation, indexOfLastReservation);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleFirstPage = () => setCurrentPage(1);
    const handleLastPage = () => setCurrentPage(totalPages);

    // 실시간으로 검색어가 변경될 때 필터링
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // 검색할 때마다 첫 페이지로 이동
    };

    // 검색 버튼을 눌렀을 때 검색어 확정
    const handleSearch = () => {
        setConfirmedSearchTerm(searchTerm);
        setCurrentPage(1); // 검색 결과로 첫 페이지로 이동
    };

    // Enter 키를 눌렀을 때 검색 실행
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // 예약 상태 변경 처리
    const handleStatusChange = (id, newStatus) => {
        const updatedReservations = reservations.map(reservation => 
            reservation.id === id ? { ...reservation, status: newStatus } : reservation
        );
        setReservations(updatedReservations);
    };

    return (
        <div className="hos-reser-control-container">
            <h2 className="hos-reser-control-title">예약 현황 - 2024.09.05</h2>
            <div className="hos-reser-control-search-bar">
                <input
                    type="text"
                    className="hos-reser-control-search-input"
                    placeholder="아이디"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                />
                <button className="hos-reser-control-search-button" onClick={handleSearch}>
                    검색
                </button>
            </div>
            <table className="hos-reser-control-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>아이디</th>
                        <th>예약자</th>
                        <th>예약 날짜</th>
                        <th>예약 시간</th>
                        <th>펫 이름</th>
                        <th>예약 유형</th>
                        <th>예약 상태</th>
                        <th>예약 상태 변경</th>
                    </tr>
                </thead>
                <tbody>
                    {currentReservations.length > 0 ? (
                        currentReservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td>{reservation.id}</td>
                                <td>{reservation.userId}</td>
                                <td>{reservation.name}</td>
                                <td>{reservation.date}</td>
                                <td>{reservation.time}</td>
                                <td>{reservation.petName}</td>
                                <td>{reservation.type}</td>
                                <td>{reservation.status}</td>
                                <td>
                                    <button
                                        className="action-button cancel"
                                        onClick={() => handleStatusChange(reservation.id, '취소')}
                                    >
                                        취소
                                    </button>
                                    <button
                                        className="action-button approve"
                                        onClick={() => handleStatusChange(reservation.id, '승인')}
                                    >
                                        승인
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">검색 결과가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="hos-reser-control-pagination">
                <button onClick={handleFirstPage} disabled={currentPage === 1}>
                    ◀
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? 'active' : ''}
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

export default HosReserControl;
