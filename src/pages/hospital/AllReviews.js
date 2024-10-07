import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allReviewAPI } from '../../api/ReviewAPICalls';
import "../../css/AllReviews.css";

function AllReviews() {

    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review.reviews);
    console.log("reviews@@@@@@@ : ", reviews);
    

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

    // 병원별로 후기를 그룹화
    const groupedReviews = reviews.reduce((acc, review) => {
        (acc[review.hosName] = acc[review.hosName] || []).push(review);
        return acc;
    }, {});

    return (
        <div>
            <h1>전체 병원 후기</h1>
            <div className="hospitals-container">
                {Object.keys(groupedReviews).map((hosName, index) => (
                    <div key={index} className="hospital-group">
                    <h2>{hosName}</h2> {/* 병원 이름 */}
                    {groupedReviews[hosName].map((reviews, idx) => {
                        const randomColor = getRandomColor();
                    return (                            
                            <div 
                                key={idx} 
                                className="review-card" 
                                style={{ border: `5px solid ${randomColor}` }}>
                                <p><strong>ID:</strong> {reviews.userId}  _  {reviews.userName}</p> {/* 사용자 ID */}
                                <p><strong>이름:</strong> {reviews.hosName}</p> {/* 병원 이름 */}
                                <p><strong>주소:</strong> {reviews.address}</p> {/* 병원 주소 */}
                                <p><strong>작성일:</strong> {formatDate(reviews.createdDate)}</p> {/* 리뷰 작성일 */}
                                <p><strong>내용:</strong> {reviews.content}</p> {/* 리뷰 내용 */}
                                <p><strong>진료:</strong> {reviews.clinicName}</p> {/* 진료 이름 */}
                            </div>
                    );
                })}
            </div>
            ))}
        </div>
        </div>
    );
}

export default AllReviews;