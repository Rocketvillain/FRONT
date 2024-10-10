import React, { useEffect,useState } from 'react';
import '../../css/MyReviews.css';
import { deleteReview, reviewDetailByUserIdAPI, updateReviewContent } from '../../api/ReviewAPICalls';
import { useDispatch, useSelector } from 'react-redux';

function MyReviews() {
    const dispatch = useDispatch();

    const [selectedReview, setSelectedReview] = useState(null); // 선택된 후기 상태
    const [isModalOpen, setModalOpen] = useState(false); // 후기 수정 모달 상태
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false); // 수정 확인 모달 상태
    const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false); // 삭제 확인 모달 상태
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    
    // 후기 정보

    
    // 사용자 정보
    const userId = useSelector(state => state.user.userInfo.userId);

    // 리뷰 정보
    const reviews = useSelector(state => state.review.userReview);

    useEffect(() => {
        dispatch(reviewDetailByUserIdAPI(userId));
    }, [dispatch]);

    const handleViewReview = (review) => {
        setSelectedReview(review);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleReviewChange = (e) => {
        setSelectedReview({
            ...selectedReview,
            content: e.target.value
        })
    };

    const handleSaveReview = () => {
        dispatch(updateReviewContent(selectedReview));
        dispatch(reviewDetailByUserIdAPI(userId));
        // 부모 상태를 수정해야 한다면 상위로 상태를 끌어올려야 함
        setModalOpen(false);
        setConfirmationModalOpen(true); 
    };

    const handleDeleteReview = (reviewId) => {
        dispatch(deleteReview(reviewId));
        setDeleteConfirmationModalOpen(true);
    };

    const handleCloseDeleteConfirmationModal = () => {
        setDeleteConfirmationModalOpen(false);
        window.location.href = '/myinfo/myreviews'
    };

    const handleCloseConfirmationModal = () => {
        setConfirmationModalOpen(false);
        window.location.href = '/myinfo/myreviews'
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = reviews.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(reviews.length / recordsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    return (
        <div className="my-reviews">
            <h2>나의 후기</h2>
            <table className="reviews-table">
                <thead>
                    <tr>
                        <th>예약번호</th>
                        <th>예약자명</th>
                        <th>병원명</th>
                        <th>예약 유형</th>
                        <th>예약 날짜</th>
                        <th>예약 상태</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((review) => (
                        <tr key={review.reservationId}>
                            <td>{review.reservationId}</td>
                            <td>{review.userName}</td>
                            <td>{review.hosName}</td>
                            <td>{review.clinicName}</td>
                            <td>{`${review.reservationTime[0]}-${review.reservationTime[1]}-${review.reservationTime[2]} ${review.reservationTime[3].toString().padStart(2, '0')}:${review.reservationTime[4].toString().padStart(2, '0')}`}</td>
                            <td>
                                <button className="view-btn" onClick={() => handleViewReview(review)}>조회</button>
                                <button className="review-delete-btn" onClick={() => handleDeleteReview(review.reviewId)}>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={handleFirstPage} disabled={currentPage === 1}>
                    ◀
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={index + 1 === currentPage ? "active" : ""}>
                        {index + 1}
                    </button>
                ))}

                <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                    ▶
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{selectedReview.date} 진료 후기</h2>
                        <textarea
                            value={selectedReview.content}
                            onChange={handleReviewChange}
                            rows="5"
                            placeholder="후기 내용을 입력하세요"
                        />
                        <div className="modal-buttons">
                            <button onClick={handleSaveReview} className="save-btn">변경</button>
                            <button onClick={handleCloseModal} className="close-btn">취소</button>
                        </div>
                    </div>
                </div>
            )}

            {isConfirmationModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>리뷰가 변경되었습니다!</h2>
                        <button className="confirm-btn" onClick={handleCloseConfirmationModal}>확인</button>
                    </div>
                </div>
            )}

            {isDeleteConfirmationModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>리뷰가 삭제되었습니다!</h2>
                        <button className="confirm-btn" onClick={handleCloseDeleteConfirmationModal}>확인</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyReviews;
