import React, { useEffect, useState } from 'react';
import '../../css/hosAdmin/HosReserControl.css';
import {
    CancelReservation,
  LoadReservation,
  RemoveReservation,
} from '../../api/ReservationAPICalls';
import { useDispatch, useSelector } from 'react-redux';

function HosReserControl() {
  const dispatch = useDispatch();
  const hosId = useSelector((state) => state.user.userInfo.hosId);
  const reservations = useSelector((state) => state.reservation.Reservations);

  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage] = useState(5); // 한 페이지에 표시할 예약 수
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmedSearchTerm, setConfirmedSearchTerm] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 취소 확인 모달 상태
  const [cancelInfo, setCancelInfo] = useState({
    reservationId: null,
    description: null,
  });

  useEffect(() => {
    dispatch(LoadReservation(hosId)); // 예약 정보 업데이트
  }, [dispatch]);

  // 실시간 검색을 위한 필터링
  const filteredReservations = reservations.filter((reservation) =>
    reservation.userId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 검색 버튼을 눌렀을 때 확정된 검색어로 필터링된 예약을 가져옴
  const confirmedFilteredReservations = reservations.filter((reservation) =>
    reservation.userId
      .toLowerCase()
      .includes(confirmedSearchTerm.toLowerCase()),
  );

  // 페이지 수 계산
  const totalPages = Math.ceil(
    (confirmedSearchTerm ? confirmedFilteredReservations : filteredReservations)
      .length / reservationsPerPage,
  );

  // 예약 데이터 페이지 계산
  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = (
    confirmedSearchTerm ? confirmedFilteredReservations : filteredReservations
  ).slice(indexOfFirstReservation, indexOfLastReservation);

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

  // 예약 상태 변경 (취소)
  const openCancelModal = () => {
    setShowConfirmModal(true); // 삭제 확인 모달 열기
  };

  // 예약 상태 변경 (승인)
  const handleAccept = async (id) => {
    /* eslint-disable no-restricted-globals */
    const userCheck = confirm('예약을 취소하시겠습니까?');
    /* eslint-disable no-restricted-globals */

    console.log('취소를 하였습니까?', userCheck);

    if (userCheck) {
      const result = await dispatch(RemoveReservation(id));

      if (result.httpStatusCode === 200) {
        dispatch(LoadReservation(hosId));
      } else {
        console.log('서버와의 통신이 원할하지 않습니다.');
      }
    }
  };

  // 취소 상태 반영
  const handleCancel = async () => {
    const result = await dispatch(CancelReservation(cancelInfo)); // Redux를 통해 상태를 secession으로 변경
    console.log('asdjfhsadhfdsf',result);

    if (result.httpStatusCode === 200) {
        dispatch(LoadReservation(hosId));
      } else {
        console.log('서버와의 통신이 원할하지 않습니다.');
      }

    setShowConfirmModal(false);
    alert(`예약을 취소하였습니다! 취소 사유: ${cancelInfo.description}`)
  };

  const handleDescriptionChange = (e) => {
    setCancelInfo({
        ...cancelInfo,
        description: e.target.value
    });
  };

  // 현재 날짜와 시간
  const now = new Date();

  // 날짜를 포맷합니다 (예: 2024-10-06).
  const formattedDate = now.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className='hos-reser-control-container'>
      <h2 className='hos-reser-control-title'>예약 현황 - {formattedDate}</h2>
      <div className='hos-reser-control-search-bar'>
        <input
          type='text'
          className='hos-reser-control-search-input'
          placeholder='아이디'
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />
        <button
          className='hos-reser-control-search-button'
          onClick={handleSearch}
        >
          검색
        </button>
      </div>
      <table className='hos-reser-control-table'>
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
              <tr key={reservation.reservationId}>
                <td>{reservation.reservationId}</td>
                <td>{reservation.userId}</td>
                <td>{reservation.userName}</td>
                <td>
                  {reservation.reservationTime[0]}/
                  {reservation.reservationTime[1].toString().padStart(2, '0')}/
                  {reservation.reservationTime[2].toString().padStart(2, '0')}
                </td>
                <td>
                  {reservation.reservationTime[3].toString().padStart(2, '0')}:
                  {reservation.reservationTime[4].toString().padEnd(2, '0')}
                </td>
                <td>{reservation.petName}</td>
                <td>{reservation.clinicName}</td>
                <td>
                  {reservation.state === 'activated'
                    ? '승인'
                    : reservation.state === 'request'
                    ? '취소 요청'
                    : reservation.state === 'canceled'
                    ? '취소됨'
                    : '알 수 없는 상태'}
                </td>
                <td>
                  {reservation.state === 'activated' ? (
                    <button
                      className='action-button cancel'
                      onClick={() => {
                        setCancelInfo({
                            ...cancelInfo,
                            reservationId: reservation.reservationId
                        });
                        openCancelModal();
                      }}
                    >
                      취소
                    </button>
                  ) :  reservation.state === 'request' ? (
                    <button
                      className='action-button approve'
                      onClick={() => handleAccept(reservation.reservationId)}
                    >
                      승인
                    </button>
                  ) : (
                    <p>취소 사유 : 
                        <span style={{textDecoration: 'line-through'}}>{reservation.description}</span>
                    </p>
                  ) }
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='9'>검색 결과가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className='hos-reser-control-pagination'>
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

      {/* 삭제 확인 모달 */}
      {showConfirmModal && (
        <div className='user-control-modal'>
          <div className='user-control-modal-content'>
            <p>탈퇴하시겠습니까?</p>
            <label>취소 사유</label>
            <textarea
              placeholder='취소 사유를 입력해주세요'
              onChange={handleDescriptionChange}
            ></textarea>
            <div className='user-control-modal-buttons'>
              <button onClick={handleCancel}>확인</button>
              <button onClick={() => setShowConfirmModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HosReserControl;
