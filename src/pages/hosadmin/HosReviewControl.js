import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reviewDetailAPI } from '../../api/ReviewAPICalls';
import '../../css/hosAdmin/HosReviewControl.css';

function HosReviewControl() {
    
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review.hospital);
    console.log("reviews : ----- ", reviews);
    
    const hosId = useSelector(state => state.hospital.hospital.hosId);
    console.log("hosId : ", hosId);
    
    useEffect(() => {
        dispatch(reviewDetailAPI(hosId));
    }, [dispatch, hosId]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(5); // 한 페이지에 표시할 후기 수
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false); // 검색 상태 관리
    const [filteredReviews, setFilteredReviews] = useState(reviews); // 검색 결과
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

    // 검색 실행 처리
    const handleSearch = () => {
        const filtered = reviews.filter(reviews =>
            reviews.userId.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <th>예약 유형</th>
                        <th>작성 내용</th>
                        <th>작성 날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {currentReviews.length > 0 ? (
                        currentReviews.map((reviews) => (
                            <tr key={hosId}>
                                <td>{reviews.reservationId}</td>
                                <td>{reviews.userId}</td>
                                <td>{reviews.userName}</td>
                                <td>{reviews.clinicName}</td>
                                <td>{reviews.content}</td>
                                <td>{reviews.createdDate}</td>
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
        </div>
    );
}

export default HosReviewControl;
