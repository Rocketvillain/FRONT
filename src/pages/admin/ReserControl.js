import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/admin/ReserControl.css';
import { adminGetAllReservationsAPI } from '../../api/AdminAPICalls';

function ReserControl() {
    const dispatch = useDispatch();
    const reservations = useSelector(state => state.adminReser.reservations);
    console.log('reservations', reservations);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState(''); // 선택한 진료 유형
    const [currentPage, setCurrentPage] = useState(1);
    const [searchClicked, setSearchClicked] = useState(false); // 검색 버튼을 클릭했는지 여부
    const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수

    useEffect(() => {
        dispatch(adminGetAllReservationsAPI());
    }, [dispatch]);


    // 진료 유형 목록
    const types = ['모든 유형', '진료', '수술', '미용'];

    // 검색 및 필터 처리 (검색 버튼을 눌렀을 때만 필터 적용)
    // 검색 및 필터 처리
    const filteredReservations = searchClicked
        ? reservations.filter(reservation => {
            // 아이디가 입력된 경우
            const matchesSearchTerm = searchTerm
                ? reservation.userid && reservation.userid.toLowerCase().includes(searchTerm.toLowerCase())
                : true; // 검색어가 없으면 모두 포함

            // 선택된 진료 유형이 있을 경우
            const matchesType = selectedType && selectedType !== '모든 유형'
                ? reservation.clinicName === selectedType
                : true; // 진료 유형이 선택되지 않으면 모두 포함

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
                        currentReservations.map((reservation) => {
                            // reservationTime 배열을 이용해 Date 객체 생성
                            const reservationDate = new Date(
                                reservation.reservationTime[0],  // year
                                reservation.reservationTime[1] - 1,  // month (0-based in JS)
                                reservation.reservationTime[2],  // day
                                reservation.reservationTime[3],  // hour
                                reservation.reservationTime[4]   // minute
                            );

                            // 원하는 포맷으로 변환 ('YYYY-MM-DD HH:MM')
                            const formattedDate = `${reservationDate.getFullYear()}-${String(reservationDate.getMonth() + 1).padStart(2, '0')}-${String(reservationDate.getDate()).padStart(2, '0')} ${String(reservationDate.getHours()).padStart(2, '0')}:${String(reservationDate.getMinutes()).padStart(2, '0')}`;

                            return (
                                <tr key={reservation.reservationId}>
                                    <td>{reservation.reservationId}</td>
                                    <td>{reservation.userId}</td>
                                    <td>{reservation.hosName}</td>
                                    <td>{reservation.userName}</td>
                                    <td>{formattedDate}</td>  {/* 포맷된 날짜 표시 */}
                                    <td>{reservation.petName}</td>
                                    <td>{reservation.clinicName}</td>
                                    <td className={`reser-control-state ${reservation.state === 'request' ? 'request' : reservation.state === 'canceled' ? 'canceled' : reservation.state === 'activated' ? 'activated' : ''}`}>
                                        {/* 상태에 따라 출력되는 한글로 변환 */}
                                        {reservation.state === 'request' ? '취소요청'
                                            : reservation.state === 'canceled' ? '취소'
                                                : reservation.state === 'activated' ? '승인'
                                                    : ''}
                                    </td>

                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="8">예약 정보가 없습니다.</td>
                        </tr>
                    )}
                </tbody>

            </table>

            <div className="reser-control-pagination">
                <button onClick={() => handlePageChange(1)} disabled={currentPage === 1 || filteredReservations.length === 0}>
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
                <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages || filteredReservations.length === 0}>
                    ▶
                </button>
            </div>
        </div>
    );
}

export default ReserControl;
