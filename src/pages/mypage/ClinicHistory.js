import React, { useState, useEffect } from "react";
import "../../css/ClinicHistory.css";

function ClinicHistory() {
    const [clinicHistory, setClinicHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6;

    // 가상 데이터 (추후 API 호출로 대체 가능)
    useEffect(() => {
        const mockData = [
            { id: 3247, name: "동동구리", hospital: "강남 펫닥", type: "진료", date: "2024.06.23", status: "완료" },
            { id: 3128, name: "동동구리", hospital: "강남 펫닥", type: "미용(위생미용)", date: "2024.05.11", status: "완료" },
            { id: 2466, name: "동동구리", hospital: "어클리둑", type: "미용", date: "2024.02.06", status: "완료" },
            { id: 3247, name: "동동구리", hospital: "강남 펫닥", type: "진료", date: "2023.12.21", status: "완료" },
            { id: 3128, name: "동동구리", hospital: "아프지멍", type: "수술", date: "2023.10.10", status: "완료" },
            { id: 2466, name: "동동구리", hospital: "서초 애견 샬롱", type: "미용(염색)", date: "2023.09.27", status: "완료" },
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

    return (
        <div className="clinic-history">
            <h2>진료 기록</h2>
            <table className="clinic-table">
                <thead>
                    <tr>
                        <th>예약번호</th>
                        <th>예약자명</th>
                        <th>병원명</th>
                        <th>예약 유형</th>
                        <th>예약 날짜</th>
                        <th>예약 상태</th>
                        <th>리뷰</th> {/* 리뷰 칸 추가 */}
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
                            <td> {/* 리뷰 쓰기 버튼을 별도 칸에 표시 */}
                                {record.status === "완료" && (
                                    <button className="review-btn">리뷰 쓰기🖋</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {/* 왼쪽 화살표: 첫 페이지로 이동 */}
                <button onClick={handleFirstPage} disabled={currentPage === 1}>
                    ◀
                </button>

                {/* 페이지 번호 버튼 */}
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}

                {/* 오른쪽 화살표: 마지막 페이지로 이동 */}
                <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                    ▶
                </button>
            </div>
        </div>
    );
}

export default ClinicHistory;
