import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadReservationByUserId } from '../../api/ReservationAPICalls'; 
import { addReviewAPI, updatedReviewAPI, deletedReviewAPI } from '../../api/ReviewAPICalls';
import '../../css/ClinicHistory.css';

function ClinicHistory({ addReview, reviews = [] }) {

    const dispatch = useDispatch();
    const reservations = useSelector(state => state.reservation.reservations);
    console.log("잘 들어갔니 예약아?? : ", reservations);

    // 로그인한 사용자의 ID 가져오기
    const userId = useSelector(state => state.user.userInfo.userId);
    
    const review = useSelector(state =>
        state.review.reviews.filter(review => review.userId === userId)
    );
    console.log("잘 들어갔니 리뷰야?? : ", review);
    

    useEffect(() => {
        dispatch(LoadReservationByUserId(userId), addReviewAPI(userId));
    }, [dispatch, userId]);

    const [clinicHistory, setClinicHistory] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [reviewContent, setReviewContent] = useState("");
    const [writtenReviews, setWrittenReviews] = useState(new Set());

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6;

    

    useEffect(() => {
        // 지난 예약 기록 필터링(오늘 날짜보다 이전 예약 날짜 기록을 보여줌)
        const now = new Date();
        const pastReservations = reservations.filter((reservation) => {
            const [year, month, day] = reservation.reservationTime;
            const reservationDate = new Date(year, month - 1, day);
            return reservationDate < now;
        });
        setClinicHistory(pastReservations);
    }, [reservations]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = clinicHistory.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(clinicHistory.length / recordsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleFirstPage = () => setCurrentPage(1);
    const handleLastPage = () => setCurrentPage(totalPages);

    const handleReviewWrite = (record) => {
        setSelectedRecord(record);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setReviewContent("");
    };

    const handleSaveReview = () => {
        if (selectedRecord) {
            const newReview = {
                id: selectedRecord.id,
                name: selectedRecord.name,
                hospital: selectedRecord.hospital,
                type: selectedRecord.type,
                date: selectedRecord.date,
                status: selectedRecord.status,
                reviewText: reviewContent,
            };
            addReview(newReview); 
            setWrittenReviews((prev) => new Set(prev).add(selectedRecord.id));
            handleCloseModal();
        }
    };

    const isReviewWritten = (recordId) => {
        return reviews.some((review) => review.id === recordId) || writtenReviews.has(recordId);
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
                                    {!isReviewWritten(reservations.reservationId) && (
                                        <button className="clinic-history-reviewUpdatebutton" onClick={() => handleReviewWrite(reservations)}>
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

                {/* 진료 후 리뷰를 작성하는 모달 창 */}
            {isModalOpen && (
                <div className="clinic-history-modal-overlay">
                    <div className="clinic-history-modal-content">
                        <h2>{selectedRecord.date} 진료 후기</h2>
                        <textarea
                            value={reviewContent}
                            onChange={(e) => setReviewContent(e.target.value)}
                            rows="5"
                            placeholder="후기 내용을 입력하세요"
                        />
                        <div className="clinic-history-modal-buttons">
                            <button className="clinic-history-writebutton" onClick={handleSaveReview}>
                                작성
                            </button>
                            <button className="clinic-history-writeclosebutton" onClick={handleCloseModal}>
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ClinicHistory;
