//  관리자 후기 관리 페이지
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/admin/ReviewControl.css'; // CSS 파일을 추가합니다.

function ReviewControl() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5; // 한 페이지에 보여줄 리뷰 수
    const [isSearching, setIsSearching] = useState(false);
    const [reviews] = useState([
        { id: 1, userId: 'ohgiraffers', author: '권순혁', hospital: 'Bear동물병원', reservationType: '미용', content: '제가 원하던 모습으로 잘 해주셨습니다.', createdDate: '2024-09-28', lastModifiedDate: null },
        { id: 2, userId: 'hospital', author: '박호찬', hospital: '강아지 동물병원', reservationType: '수술', content: '덕분에 저희 오리가 잘 치료받았습니다.', createdDate: '2024-09-20', lastModifiedDate: null },
        { id: 3, userId: 'hospizza', author: '지동혁', hospital: '야옹이 동물병원', reservationType: '진료', content: '직원분들이 친절해서 잘 진료받고 갔습니다.', createdDate: '2024-09-13', lastModifiedDate: null },
        { id: 4, userId: 'user123', author: '박성운', hospital: '맞아용 동물병원', reservationType: '진료', content: '덕분에 저희 동물이 새롭게 변했습니다.', createdDate: '2024-09-07', lastModifiedDate: '2024-09-08' },
        { id: 5, userId: 'kingwe', author: '위쌈바', hospital: '몰라용 동물병원', reservationType: '미용', content: '너무 불친절했어요.', createdDate: '2024-09-01', lastModifiedDate: null },
        { id: 6, userId: 'queenkim', author: '킹강효', hospital: '로켓은 동물병원', reservationType: '진료', content: '여기 병원 진짜 쓰레기.', createdDate: '2024-08-29', lastModifiedDate: '2024-09-01' },
        { id: 7, userId: 'jackyang', author: '양하운', hospital: '악동 동물병원', reservationType: '수술', content: '덕분에 저희 뽀미가 살 수 있게 됐습니다.', createdDate: '2024-09-17', lastModifiedDate: null }
        // 더미 리뷰 데이터를 추가하세요
    ]);

    const [filteredReviews, setFilteredReviews] = useState(reviews); // 처음에는 전체 리뷰 목록을 표시
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
    const navigate = useNavigate();

    // 검색 실행 처리
    const handleSearch = () => {
        const filtered = reviews.filter(review =>
            review.userId.toLowerCase().includes(searchTerm.toLowerCase())
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

    // const handleReportClick = () => {
    //     navigate('/reportscontrol');
    // };

    // 페이징 처리
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);


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
                        <th>예약유형</th>
                        <th>작성내용</th>
                        <th>작성날짜</th>
                        <th>최종 수정 날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {currentReviews.length > 0 ? (
                        currentReviews.map(review => (
                            <tr key={review.id}>
                                <td>{review.id}</td>
                                <td>{review.userId}</td>
                                <td>{review.author}</td>
                                <td>{review.hospital}</td>
                                <td>{review.reservationType}</td>
                                <td>{review.content}</td>
                                <td>{review.createdDate}</td>
                                <td>{review.lastModifiedDate ? review.lastModifiedDate : 'N/A'}</td>
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
                <button onClick={handleFirstPage} disabled={currentPage === 1}>
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
                <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                    ▶
                </button>
            </div>
        </div>
    );
}

export default ReviewControl;
