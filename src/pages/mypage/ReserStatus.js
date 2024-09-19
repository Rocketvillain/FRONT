// 마이페이지 예약현황 페이지
import React, { useEffect, useState } from "react";
import "../../css/ReserStatus.css";

const ReserStatus = () => {
    const [reservations, setReservations] = useState([]); // 예약 데이터를 저장, 초기값은 빈 배열[]
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태-기본값은 true이며, 예약 정보를 불러오는 중임을 표시
    const [error, setError] = useState(null); // 데이터를 불러오는 중 발생한 오류 메시지를 저장하는 상태

    // 로그인한 사용자의 ID 가져오기
    const userId = localStorage.getItem('userId')?.trim(); // 또는 sessionStorage.getItem('userId');

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                // 사용자 ID를 쿼리 파라미터로 전달
                const response = await fetch(`/api/reservations?userId=${userId}`);
                if (!response.ok) {
                    throw new Error("데이터를 불러오는데 실패했습니다.");
                }
                const data = await response.json();
                setReservations(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (userId) {
            fetchReservations(); // 로그인한 사용자의 예약 정보만 가져옴
        } else {
            setError("사용자 정보가 없습니다.");
            setLoading(false);
        }
    }, [userId]);

    const handleCancel = async (id) => {
        try {
            // 서버에 취소 요청을 보냅니다.
            const response = await fetch(`/api/cancelReservation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reservationId: id }),
            });
    
            if (!response.ok) {
                throw new Error('취소 요청에 실패했습니다.');
            }
    
            // 취소 요청이 성공하면, 상태를 '취소 요청 중'으로 변경합니다.
            setReservations(
                reservations.map((reservation) =>
                    reservation.id === id ? { ...reservation, status: "취소 요청 중" } : reservation
                )
            );
        } catch (error) {
            console.error('취소 요청 중 오류 발생:', error);
            // 오류 처리를 위한 로직 추가 가능
        }
    };
    

    // 데이터를 불러오는 동안 텍스트 표시
    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (error) {
        return <p>오류 발생: {error}</p>;
    }

    return (
        <div className="reservation-status">
            <h2>예약 현황</h2>
            <table className="reservation-table">
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
                    {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td>{reservation.id}</td>
                            <td>{reservation.name}</td>
                            <td>{reservation.hospital}</td>
                            <td>{reservation.type}</td>
                            <td>{reservation.date}</td>
                            <td>
                                {reservation.status === "승인" ? (
                                    <>
                                        <span>{reservation.status}</span>
                                        <button
                                            className="cancel-btn"
                                            onClick={() => handleCancel(reservation.id)}
                                        >
                                            취소
                                        </button>
                                    </>
                                ) : (
                                    <span>{reservation.status}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button>◀</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
                <button>▶</button>
            </div>
        </div>
    );
};

export default ReserStatus;
