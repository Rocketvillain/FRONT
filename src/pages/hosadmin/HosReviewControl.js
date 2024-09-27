import React, { useState } from 'react';
import '../../css/hosAdmin/HosReviewControl.css';

function HosReviewControl() {
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(5); // 한 페이지에 표시할 후기 수
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false); // 검색 상태 관리
    const [showReportModal, setShowReportModal] = useState(false); // 신고 모달 상태
    const [reportedReviewId, setReportedReviewId] = useState(null); // 신고된 리뷰 ID 상태
    const [reviews, setReviews] = useState([
        { id: '001', userId: 'ohgiraffers', name: '권순혁', hospital: '강아지 동물병원', type: '미용', content: '제가 원하는 모습으로 잘 해주셨습니다', date: '24/09/28', reported: false },
        { id: '002', userId: 'hospital', name: '박호찬', hospital: '강아지 동물병원', type: '수술', content: '덕분에 저희 오리가 잘 치료받았습니다', date: '24/09/20', reported: false },
        { id: '003', userId: 'hospizza', name: '박동운', hospital: '강아지 동물병원', type: '진료', content: '직원분들이 친절해서 잘 진료받고 갑니다', date: '24/09/10', reported: false },
        { id: '004', userId: 'user123', name: '지동혁', hospital: '강아지 동물병원', type: '진료', content: '병원 진료가 매우 만족스러웠습니다.', date: '24/09/13', reported: false },
        { id: '005', userId: 'kingwe', name: '위쌈바', hospital: '강아지 동물병원', type: '미용', content: '저희 동물이 새롭게 변했습니다.', date: '24/10/01', reported: false },
        { id: '006', userId: 'queenkim', name: '김강효', hospital: '강아지 동물병원', type: '진료', content: '여기 병원 진짜 좋네요!', date: '24/10/22', reported: false },
        { id: '007', userId: 'jackyang', name: '양하윤', hospital: '강아지 동물병원', type: '수술', content: '덕분에 저희 쫑이가 살 수 있었습니다', date: '24/09/17', reported: false }
    ]);
    const [filteredReviews, setFilteredReviews] = useState(reviews); // 검색 결과

    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

    // 검색 실행 처리
    const handleSearch = () => {
        const filtered = reviews.filter(review =>
            review.userId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredReviews(filtered);
        setIsSearching(true); // 검색 상태 업데이트
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
    };

    // Enter 키를 눌렀을 때 검색 실행
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // 검색어 변경 처리
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // 페이지네이션 처리
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleFirstPage = () => setCurrentPage(1);
    const handleLastPage = () => setCurrentPage(totalPages);

    // 신고 모달 열기
    const openReportModal = (reviewId) => {
        setReportedReviewId(reviewId);
        setShowReportModal(true); // 신고 모달 열기
    };

    // 신고 완료 후 모달 닫기
    const closeReportModal = () => {
        // 신고된 리뷰를 'reported: true'로 업데이트하여 신고 버튼을 사라지게 함
        const updatedReviews = reviews.map(review =>
            review.id === reportedReviewId ? { ...review, reported: true } : review
        );
        setReviews(updatedReviews);
        setFilteredReviews(updatedReviews); // 필터링된 리뷰도 업데이트
        setShowReportModal(false); // 신고 모달 닫기
    };

    return (
        <div className="hos-admin-review-container">
            <h2 className="hos-admin-review-title">후기 조회</h2>
            <div className="hos-admin-review-search-bar">
                <input
                    type="text"
                    className="hos-admin-review-search-input"
                    placeholder="아이디"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress} // Enter 키 처리
                />
                <button className="hos-admin-review-search-button" onClick={handleSearch}>
                    검색
                </button>
            </div>

            <table className="hos-admin-review-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>아이디</th>
                        <th>작성자</th>
                        <th>병원</th>
                        <th>예약유형</th>
                        <th>작성내용</th>
                        <th>작성날짜</th>
                        <th>신고</th>
                    </tr>
                </thead>
                <tbody>
                    {currentReviews.length > 0 ? (
                        currentReviews.map((review) => (
                            <tr key={review.id}>
                                <td>{review.id}</td>
                                <td>{review.userId}</td>
                                <td>{review.name}</td>
                                <td>{review.hospital}</td>
                                <td>{review.type}</td>
                                <td>{review.content}</td>
                                <td>{review.date}</td>
                                <td>
                                    {!review.reported ? (
                                        <button
                                            className="hos-admin-review-report-button"
                                            onClick={() => openReportModal(review.id)}
                                        >
                                            신고
                                        </button>
                                    ) : (
                                        '신고 완료'
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">
                                {isSearching ? '검색 결과가 없습니다.' : '후기 목록이 없습니다.'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="hos-admin-review-pagination">
                <button onClick={handleFirstPage} disabled={currentPage === 1}>
                    ◀
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? 'hos-admin-review-active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                    ▶
                </button>
            </div>

            {/* 신고 확인 모달 */}
            {showReportModal && (
                <div className="hos-review-control-modal">
                    <div className="hos-review-control-modal-content">
                        <p>신고 요청이 완료되었습니다.</p>
                        <div className="hos-review-control-modal-buttons">
                            <button onClick={closeReportModal}>확인</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HosReviewControl;
