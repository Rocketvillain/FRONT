import React, { useState } from 'react';
import '../../css/MyReviews.css';
// 마이페이지 나의 후기 페이지

// 샘플 데이터 (삭제 후 새로고침 시 복원되는 데이터)
const initialReviews = [
    { id: 3247, name: '동동구리', hospital: '강남 펫닥', type: '진료', date: '2024.06.23', status: '완료', reviewText: '진료가 매우 만족스러웠습니다.' },
    { id: 3128, name: '동동구리', hospital: '강남 펫닥', type: '미용(위생미용)', date: '2024.05.11', status: '완료', reviewText: '우리 강아지 미용이 정말 마음에 들어요.' },
    { id: 3129, name: '동동구리', hospital: '아프지멍', type: '수술', date: '2023.10.10', status: '완료', reviewText: '의사 선생님이 너무 친절하셨어요. 회복도 빠릅니다.' },
];

function MyReviews() {
    const [reviews, setReviews] = useState(initialReviews); // 상태로 관리하는 후기 데이터
    const [deletedReviews, setDeletedReviews] = useState([]); // 삭제된 후기 ID 목록
    const [selectedReview, setSelectedReview] = useState(null); // 선택된 후기 상태
    const [isModalOpen, setModalOpen] = useState(false); // 후기 수정 모달 상태
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false); // 수정 확인 모달 상태
    const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false); // 삭제 확인 모달 상태
    const [reviewContent, setReviewContent] = useState(''); // 후기 내용 상태

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6; // 페이지당 표시할 후기 수

    // 후기 수정 모달 열기 (후기 내용을 보여줌)
    const handleViewReview = (review) => {
        setSelectedReview(review);
        setReviewContent(review.reviewText); // 후기 내용 설정
        setModalOpen(true);
    };

    // 후기 수정 모달 닫기
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // 후기 내용 수정 핸들러
    const handleReviewChange = (e) => {
        setReviewContent(e.target.value);
    };

    // 후기 변경 저장
    const handleSaveReview = () => {
        const updatedReviews = reviews.map((review) =>
            review.id === selectedReview.id ? { ...review, reviewText: reviewContent } : review
        );
        setReviews(updatedReviews); // 수정된 후기 상태로 저장
        setModalOpen(false); // 후기 수정 모달 닫기
        setConfirmationModalOpen(true); // 확인 모달 열기
    };

    // 후기 삭제
    const handleDeleteReview = (reviewId) => {
        setDeletedReviews([...deletedReviews, reviewId]); // 삭제된 후기를 ID 목록에 추가
        setDeleteConfirmationModalOpen(true); // 삭제 확인 모달 열기
    };

    // 후기 삭제 확인 모달 닫기
    const handleCloseDeleteConfirmationModal = () => {
        setDeleteConfirmationModalOpen(false); // 삭제 확인 모달 닫기
    };

    // 리뷰 수정 후 확인 모달 닫기
    const handleCloseConfirmationModal = () => {
        setConfirmationModalOpen(false);
    };

    // 삭제된 후기를 제외한 목록 필터링
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
                        <tr key={review.id}>
                            <td>{review.id}</td>
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

            {/* 페이지네이션 */}
            <div className="pagination">
                {/* 첫 페이지로 이동 */}
                <button onClick={handleFirstPage} disabled={currentPage === 1}>
                    ◀
                </button>

                {/* 페이지 번호 */}
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}

                {/* 마지막 페이지로 이동 */}
                <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                    ▶
                </button>
            </div>

            {/* 후기 수정 모달 */}
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

            {/* 리뷰 수정 후 확인 모달 */}
            {isConfirmationModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>리뷰가 변경되었습니다!</h2>
                        <button className="confirm-btn" onClick={handleCloseConfirmationModal}>확인</button>
                    </div>
                </div>
            )}

            {/* 리뷰 삭제 후 확인 모달 */}
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
