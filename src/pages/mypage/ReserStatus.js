// 마이페이지 예약현황 페이지
import React, { useEffect, useState } from "react";
import "../../css/ReserStatus.css";
import { useDispatch, useSelector } from "react-redux";
import { CancelReservation, LoadReservationByUserId } from "../../api/ReservationAPICalls";

const ReserStatus = () => {

    const dispatch = useDispatch();
    const reservations = useSelector(state => state.reservation.reservations);
    console.log('유저 예약 현황', reservations);

    // 예약 취소 처리 
    const [showCancelModal, setShowCancelModal] = useState(false); // 취소 확인 모달 상태
    const [cancelInfo, setCancelInfo] = useState({
        reservationId: null,
        description: null,
        state: "request"
    });

    // 페이징 처리
    const [currentPage, setCurrentPage] = useState(1);
    const [reservationsPerPage] = useState(5); // 한 페이지에 표시할 예약 수
    const totalPages = Math.ceil(reservations.length / reservationsPerPage);
    const indexOfLastReservation = currentPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleFirstPage = () => setCurrentPage(1);
    const handleLastPage = () => setCurrentPage(totalPages);

    // 로그인한 사용자의 ID 가져오기
    const userId = useSelector(state => state.user.userInfo.userId);

    useEffect(() => {
        dispatch(LoadReservationByUserId(userId));
    }, [dispatch]);

    const openCancelModal = () => {
        setShowCancelModal(true);
    }

    const handleCancel = async () => {
        const result = await dispatch(CancelReservation(cancelInfo));
        console.log('asdjfhsadhfdsf',result);

        if (result.httpStatusCode === 200) {
            dispatch(LoadReservationByUserId(userId));
        } else {
            console.log('서버와의 통신이 원할하지 않습니다.');
        }

        setShowCancelModal(false);
        alert(`예약을 취소하였습니다!`)
    };

    return (
        <div className="reservation-status">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>예약 현황</h2>
                <img src="/images/logo2.png" id="reservation-logo"></img>
            </div>
            <div id="reservation-line"></div>
            <table className="reservation-table">
                <thead>
                    <tr style={{height: '45px'}}>
                        <th>번호</th>
                        <th>예약자명</th>
                        <th>병원명</th>
                        <th>예약 유형</th>
                        <th>예약 날짜</th>
                        <th>예약 상태</th>
                        <th>비고(취소사유)</th>
                    </tr>
                </thead>
                <tbody>
                    {currentReservations.length > 0 ? (
                        currentReservations.map((reservation) => (
                        <tr key={reservation.reservationId}>
                            <td>{reservation.reservationId}</td>
                            <td>{reservation.userId}</td>
                            <td>{reservation.hosName}</td>
                            <td>{reservation.clinicName}</td>
                            <td>{`${reservation.reservationTime[0]}-${reservation.reservationTime[1]}-${reservation.reservationTime[2]} ${reservation.reservationTime[3].toString().padStart(2, '0')}:${reservation.reservationTime[4].toString().padStart(2, '0')}`}</td>
                            <td>{reservation.state === 'activated'
                                    ? '승인'
                                    : reservation.state === 'request'
                                    ? '취소 요청'
                                    : reservation.state === 'canceled'
                                    ? '취소됨'
                                    : '확인요망'}</td>
                            <td>
                                {reservation.state === "activated" ? (
                                    <>
                                        <button
                                            className="cancel-btn"
                                            onClick={() => {
                                                setCancelInfo({
                                                    ...cancelInfo,
                                                    reservationId: reservation.reservationId,
                                                    description: reservation.description
                                                })
                                                openCancelModal();
                                            }}
                                        >
                                            취소
                                        </button>
                                    </>
                                ) : reservation.state === "canceled" ? (
                                    <span>{reservation.description}</span>
                                    )
                                        : (
                                            <p style={{margin: '0'}}>-</p>
                                )}
                            </td>
                        </tr>
                        ))
                    ) : (
                            <tr>
                                <td colSpan='7'>예약 기록이 없습니다.</td>
                            </tr>
                    )
                }
                </tbody>
            </table>
            <div className="pagination" style={{}}>
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

            {/* 취소 확인 모달 */}
            {showCancelModal && (
                <div className="cancel-confirm-modal">
                    <div className="cancel-confirm-modal-header">
                        <img src="/images/cancel_confirm.png"></img>
                        <span>예약을 취소 하시겠습니까?</span>
                    </div>
                    <div className="cancel-confirm-modal-button">
                        <button id="cancel-confirm-modal-button-yes" onClick={handleCancel}>예</button>
                        <button id="cancel-confirm-modal-button-no" onClick={() => setShowCancelModal(false)}>아니오</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReserStatus;
