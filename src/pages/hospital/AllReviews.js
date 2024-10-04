import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allReviewAPI } from '../../api/ReviewAPICalls';
import "../../css/AllReviews.css";

function AllReviews() {

    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review.reviews);

    // 랜덤 색상 생성 함수
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // 날짜 포맷을 변경하는 함수
    const formatDate = (dateString) => {
        const year = dateString[0];
        const month = dateString[1];
        const day = dateString[2];
        return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
    };
    
    useEffect(() => {
        // API 호출 후 정보를 받아 redux로 state 변경
        dispatch(allReviewAPI());
    }, [dispatch]);

    return (
        <div>
            <h1>전체 병원 후기</h1>
            <div className="reviews-container">
                {reviews.map((review, index) => {
                    const hospital = review.reservation.hosId; // 병원 정보
                    const user = review.reservation.userId; // 사용자 정보
                    const clinicType = review.reservation.clinicType; // 진료 타입

                    const randomColor = getRandomColor();

                    return (
                        <div key={index} className="hospital-group">
                            <h3>{hospital.name}</h3> {/* 병원 이름 */}
                            <div 
                                className="review-card" 
                                style={{ border: `5px solid ${randomColor}` }}>
                                <p><strong>ID:</strong> {user.userId}</p> {/* 사용자 ID */}
                                <p><strong>이름:</strong> {hospital.name}</p> {/* 병원 이름 */}
                                <p><strong>주소:</strong> {hospital.address}</p> {/* 병원 주소 */}
                                <p><strong>작성일:</strong> {formatDate(review.createdDate)}</p> {/* 리뷰 작성일 */}
                                <p><strong>내용:</strong> {review.content}</p> {/* 리뷰 내용 */}
                                <p><strong>진료:</strong> {clinicType.clinicName}</p> {/* 진료 이름 */}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AllReviews;