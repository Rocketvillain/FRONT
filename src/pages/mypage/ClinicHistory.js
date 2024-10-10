import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadReservationByUserId } from '../../api/ReservationAPICalls'; 
import { addReviewAPI } from '../../api/ReviewAPICalls';
import '../../css/ClinicHistory.css';

function ClinicHistory() {

    const dispatch = useDispatch();
    const reservations = useSelector(state => state.reservation.reservations);
    console.log("잘 들어갔니 예약아?? : ", reservations);
    const userId = useSelector(state => state.user.userInfo.userId);
    
    useEffect(() => {
        dispatch(LoadReservationByUserId(userId));
    }, [dispatch]);

    useEffect(() => {
            // 지난 예약 기록 필터링(오늘 날짜보다 이전 예약 날짜 기록을 보여줌)
            const now = new Date();
            const pastReservations = reservations.filter((reservations) => {
                const [year, month, day] = reservations.reservationTime;
                const reservationDate = new Date(year, month - 1, day);
                return reservationDate < now;
            });
            setClinicHistory(pastReservations);
        }, [reservations]);

    // 사용자의 지난 예약 기록
    const [clinicHistory, setClinicHistory] = useState([]);
    
    // 모달창
    const [isModalOpen, setModalOpen] = useState(false);
    const [isConfirmationOpen, setConfirmationOpen] = useState(false); // 작성 확인 모달 상태
    const [isCompleteOpen, setCompleteOpen] = useState(false); // 작성 완료 모달 상태
    
    // 사용자가 작성하려는 리뷰와 관련된 예약 정보
    const [selectedReservation, setSelectedReservation] = useState(null);

    // 사용자가 입력한 리뷰 내용 저장
    const [reviewContent, setReviewContent] = useState({
        content: ""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = clinicHistory.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(clinicHistory.length / recordsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleFirstPage = () => setCurrentPage(1);
    const handleLastPage = () => setCurrentPage(totalPages);

    // 리뷰 작성
    const handleReviewWrite = (reservationId) => {
        setSelectedReservation(reservationId);
        setReviewContent({
            ...reviewContent,
            content: ""
        });
        setModalOpen(true);
    };

    // 리뷰 작성 모달 닫기
    const handleCloseModal = () => {
        setModalOpen(false);
    };


    // 작성 확인 모달 열기
    const handleOpenConfirmation = () => {
        setConfirmationOpen(true);
    };

    // 작성 확인 모달 닫기
    const handleCloseConfirmation = () => {
        setConfirmationOpen(false);
    };

    // 리뷰 작성 완료 및 API 호출
    const handleSaveReview = () => {
        if (selectedReservation) {
            console.log(reviewContent);
            
            dispatch(addReviewAPI(selectedReservation,reviewContent))
                .then(() => {
                    setCompleteOpen(true);
                    setTimeout(() => {
                        setCompleteOpen(false);
                    }, 1000); // 1초 뒤에 완료 모달 자동 닫기
                });
            handleCloseConfirmation();
            handleCloseModal();
            window.location.href="/myinfo/clinichistory"
        }
    };

    return (
        <div className="clinic-history">
            <h2>진료 기록</h2>
            <table className="clinic-history-clinic-table">
                <thead>
                    <tr>
                        <th>예약번호</th>
                        <th>예약자명</th>
                        <th>병원명</th>
                        <th>예약 유형</th>
                        <th>예약 날짜</th>
                        <th>예약 상태</th>
                        <th>리뷰</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.length > 0 ? (
                        currentRecords.map((reservations) => (
                            <tr key={reservations.reservationId}>
                                <td>{reservations.reservationId}</td>
                                <td>{reservations.userId}</td>
                                <td>{reservations.hosName}</td>
                                <td>{reservations.clinicName}</td>
                                <td>{`${reservations.reservationTime[0]}-${reservations.reservationTime[1]}-${reservations.reservationTime[2]}`}</td>
                                <td>{reservations.state === 'activated'
                                    ? '승인'
                                    : reservations.state === 'request'
                                    ? '취소 요청'
                                    : reservations.state === 'canceled'
                                    ? '취소됨'
                                    : '확인요망'}</td>
                                <td>
                                    {!(reservations.review) && (reservations.state === 'activated') && (
                                        <button className="clinic-history-reviewUpdatebutton" onClick={() => handleReviewWrite(reservations.reservationId)}>
                                            리뷰 쓰기🖋
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">예약이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="clinic-history-pagination">
                <button onClick={handleFirstPage} disabled={currentPage === 1}>
                    ◀
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={index + 1 === currentPage ? "clinic-history-active" : ""}>
                        {index + 1}
                    </button>
                ))}
                <button onClick={handleLastPage} disabled={currentPage === totalPages}>▶</button>
            </div>

            {/* 리뷰 작성 모달 */}
            {isModalOpen && (
                <div className="clinic-history-modal-overlay">
                    <div className="clinic-history-modal-content">
                        <h3>{selectedReservation.hosName}의 진료 후기를 작성합니다.</h3>
                        <textarea
                            value={reviewContent.content}
                            onChange={(e) => setReviewContent({
                                ...reviewContent,
                                content: e.target.value
                            })
                            }
                            rows="5"
                            placeholder="내용을 입력하세요"
                        />
                        <div className="clinic-history-modal-buttons">
                            <button className="clinic-history-writebutton" onClick={handleOpenConfirmation}>작성</button>
                            <button className="clinic-history-writeclosebutton" onClick={handleCloseModal}>취소</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 작성 확인 모달 */}
            {isConfirmationOpen && (
                <div className="clinic-history-modal-overlay">
                    <div className="clinic-history-modal-content">
                        <h3>작성을 완료하시겠습니까?</h3>
                        <div className="modal-buttons">
                            <button className="clinic-history-confirm-btn" onClick={handleSaveReview}>확인</button>
                            <button className="clinic-history-cancel-btn" onClick={handleCloseConfirmation}>취소</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 작성 완료 모달 */}
            {isCompleteOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>작성 완료되었습니다!</h3>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ClinicHistory;