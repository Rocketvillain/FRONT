//  관리자 후기 관리 페이지
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetAllReviewsAPI } from '../../api/AdminAPICalls';
import '../../css/admin/ReviewControl.css'; // CSS 파일을 추가합니다.
import { adminGetAllReservationsAPI } from '../../api/AdminAPICalls';

function ReviewControl() {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review.reviews);
    const reservations = useSelector(state => state.reservation.reservations);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 10; // 한 페이지에 보여줄 리뷰 수
    const [isSearching, setIsSearching] = useState(false);
    const [filteredReviews, setFilteredReviews] = useState(reviews); // 처음에는 전체 리뷰 목록을 표시

    useEffect(() => {
        console.log('adminGetAllReviewsAPI : ', adminGetAllReviewsAPI);

        // reviews API 호출
        dispatch(adminGetAllReviewsAPI());

        // reservation API 호출
        dispatch(adminGetAllReservationsAPI());
    }, [dispatch]);

    useEffect(() => {
        if (reviews.length > 0 && reservations.length > 0) {
            const mergedReviews = reviews.map(review => {
                const reservation = reservations.find(res => res.reservationId === review.reservation?.reservationId);
                return { ...review, reservation: reservation || review.reservation }; // reservation이 있으면 덮어씌우기
            });
            console.log('mergedReviews: ', mergedReviews);
            setFilteredReviews(mergedReviews);
        }
    }, [reviews, reservations]);

    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
    const navigate = useNavigate();

    // 검색 실행 처리
    const handleSearch = () => {
        const filtered = reviews.filter(review =>
            review.reservation.userId.userId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredReviews(filtered);
        setIsSearching(true); // 검색이 진행되었음을 표시
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

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    // ◀ 버튼: 이전 페이지로 이동
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // ▶ 버튼: 다음 페이지로 이동
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // const handleReportClick = () => {
    //     navigate('/reportscontrol');
    // };

    // 페이징 처리
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

    console.log(currentReviews);



    return (
        <div className="review-control-container">
            <h2 className="review-control-title">일반 후기</h2>

            {/* <button className="review-control-report-button" onClick={handleReportClick}>신고 요청된 후기</button> */}

            <div className="review-control-search-bar">
                <input
                    type="text"
                    className="review-control-search-input"
                    placeholder="아이디로 검색"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress} // Enter 키 처리
                />
                <button
                    className="review-control-search-button"
                    onClick={handleSearch} // 검색 버튼 클릭 시 검색 실행
                >
                    검색
                </button>
            </div>

            <table className="review-control-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>아이디</th>
                        <th>작성자</th>
                        <th>병원</th>
                        <th>예약<br />유형</th>
                        <th>작성내용</th>
                        <th>작성날짜</th>
                        <th>최종 수정 날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {currentReviews.length > 0 ? (
                        currentReviews.map((review, index) => (
                            <tr key={index}>
                                <td>{review.reservation.reservationId}</td> {/* 예약 ID */}
                                <td>{review.reservation.userId}</td> {/* 사용자 ID */}
                                <td>{review.reservation.userName}</td> {/* 사용자 이름 */}
                                <td>{review.reservation.hosName}</td> {/* 병원 이름 */}
                                <td>{review.reservation.clinicName}</td> {/* 진료 유형 */}
                                <td>{review.content}</td> {/* 리뷰 내용 */}
                                <td>{`${review.createdDate[0]}-${review.createdDate[1].toString().padStart(2, '0')}-${review.createdDate[2].toString().padStart(2, '0')}`}</td> {/* 리뷰 작성일 */}
                                <td>
                                    {review.lastModifiedDate
                                        ? `${review.lastModifiedDate[0]}-${review.lastModifiedDate[1].toString().padStart(2, '0')}-${review.lastModifiedDate[2].toString().padStart(2, '0')}`
                                        : 'N/A'}
                                </td> {/* 마지막 수정일 */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">리뷰가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="review-control-pagination">
                <button onClick={handleFirstPage} disabled={currentPage === 1 || filteredReviews.length === 0}>
                    ◁◁
                </button>
                <button onClick={handlePrevPage} disabled={currentPage === 1 || filteredReviews.length === 0}>
                    ◀
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? "review-control-active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === totalPages || filteredReviews.length === 0}>
                    ▶
                </button>
                <button onClick={handleLastPage} disabled={currentPage === totalPages || filteredReviews.length === 0}>
                    ▷▷
                </button>

            </div>
        </div>
    );
}

export default ReviewControl;
