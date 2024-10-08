import React, { useState, useEffect } from 'react';
import '../../css/ClinicHistory.css';

function ClinicHistory({ addReview, reviews = [] }) {
    const [clinicHistory, setClinicHistory] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [reviewContent, setReviewContent] = useState("");
    const [writtenReviews, setWrittenReviews] = useState(new Set());

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6;

    useEffect(() => {
        const mockData = [
            { id: 3247, name: '동동구리', hospital: '강남 펫닥', type: '진료', date: '2024.06.23', status: '완료' },
            { id: 3128, name: '동동구리', hospital: '강남 펫닥', type: '미용(위생미용)', date: '2024.05.11', status: '완료' },
            { id: 2466, name: '동동구리', hospital: '어클리둑', type: '미용', date: '2024.02.06', status: '완료' },
            { id: 3248, name: '동동구리', hospital: '강남 펫닥', type: '진료', date: '2023.12.21', status: '완료' },
            { id: 3129, name: '동동구리', hospital: '아프지멍', type: '수술', date: '2023.10.10', status: '완료' },
            { id: 2468, name: '동동구리', hospital: '서초 애견 샬롱', type: '미용(염색)', date: '2023.09.27', status: '완료' },
        ];
        setClinicHistory(mockData);
    }, []);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = clinicHistory.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(clinicHistory.length / recordsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

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
            addReview(newReview); // 부모 컴포넌트(App)의 addReview 함수 호출
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
                    {currentRecords.map((record) => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.name}</td>
                            <td>{record.hospital}</td>
                            <td>{record.type}</td>
                            <td>{record.date}</td>
                            <td>{record.status}</td>
                            <td>
                                {!isReviewWritten(record.id) && (
                                    <button className="clinic-history-reviewUpdatebutton" onClick={() => handleReviewWrite(record)}>
                                        리뷰 쓰기🖋
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
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
                <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                    ▶
                </button>
            </div>

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
