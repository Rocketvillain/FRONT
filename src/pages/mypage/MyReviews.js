import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reviewDetailByUserIdAPI } from '../../api/ReviewAPICalls'; 
import '../../css/MyReviews.css';

function MyReviews({ reviews }) {

    const dispatch = useDispatch();
    const review = useSelector(state => state.review.reviews);
    console.log("사용자 id를 통해 가지고 온 리뷰 : ", review);
    
    const userId = useSelector(state => state.user.userInfo.userId);
    console.log("사용자 아이디 : ", userId);
    

    useEffect(() => {
        // API 호출 후 정보를 받아 redux로 state 변경
        dispatch(reviewDetailByUserIdAPI(userId));
    }, [dispatch]);

    const [deletedReviews, setDeletedReviews] = useState([]); // 삭제된 후기 ID 목록
    const [selectedReview, setSelectedReview] = useState(null); // 선택된 후기 상태
    const [isModalOpen, setModalOpen] = useState(false); // 후기 수정 모달 상태
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false); // 수정 확인 모달 상태
    const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false); // 삭제 확인 모달 상태
    const [reviewContent, setReviewContent] = useState(''); // 후기 내용 상태

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6;

    const handleViewReview = (review) => {
        setSelectedReview(review);
        setReviewContent(review.reviewText); // 후기 내용 설정
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleReviewChange = (e) => {
        setReviewContent(e.target.value);
    };

    const handleSaveReview = () => {
        const updatedReviews = reviews.map((review) =>
            review.id === selectedReview.id ? { ...review, reviewText: reviewContent } : review
        );
        // 부모 상태를 수정해야 한다면 상위로 상태를 끌어올려야 함
        setModalOpen(false);
        setConfirmationModalOpen(true); 
    };

    const handleDeleteReview = (reviewId) => {
        setDeletedReviews([...deletedReviews, reviewId]); // 삭제된 후기를 ID 목록에 추가
        setDeleteConfirmationModalOpen(true);
    };

    const handleCloseDeleteConfirmationModal = () => {
        setDeleteConfirmationModalOpen(false);
    };

    const handleCloseConfirmationModal = () => {
        setConfirmationModalOpen(false);
    };

    const visibleReviews = reviews.filter((review) => !deletedReviews.includes(review.id));

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = visibleReviews.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(visibleReviews.length / recordsPerPage);

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
                        <tr key={review.userId}>
                            <td>{review.userId}</td>
                            <td>{review.name}</td>
                            <td>{review.hospital}</td>
                            <td>{review.type}</td>
                            <td>{review.date}</td>
                            <td>
                                <button className="view-btn" onClick={() => handleViewReview(review)}>조회</button>
                                <button className="review-delete-btn" onClick={() => handleDeleteReview(review.id)}>삭제</button>
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
                            value={reviewContent}
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
