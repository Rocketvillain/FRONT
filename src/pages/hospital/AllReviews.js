import React, { useState } from 'react';
import "../../css/AllReviews.css";

function AllReviews() {
    // 하드코딩된 더미 데이터
    const [hospitals] = useState([
        {
            hospitalName: '서울 병원',
            reviews: [
                {
                    userId: 'user123',
                    createdAt: '2024-09-15',
                    updatedAt: '2024-09-19',
                    rating: 5,
                    content: '정말 친절하고 깨끗한 병원이었어요. 매우 만족했습니다!',
                },
                {
                    userId: 'user456',
                    createdAt: '2024-09-14',
                    updatedAt: '2024-09-16',
                    rating: 4,
                    content: '서비스가 좋았지만 대기 시간이 조금 길었어요.',
                },
            ],
        },
        {
            hospitalName: '강남 병원',
            reviews: [
                {
                    userId: 'user789',
                    createdAt: '2024-09-12',
                    updatedAt: '2024-09-18',
                    rating: 4,
                    content: '직원들이 매우 친절하고 시설도 좋았어요.',
                },
                {
                    userId: 'user101',
                    createdAt: '2024-09-11',
                    updatedAt: '2024-09-13',
                    rating: 3,
                    content: '괜찮았지만 조금 더 개선될 부분이 있다고 생각해요.',
                },
            ],
        },
    ]);

    return (
        <div className="hospitals-container">
            {hospitals.map((hospital, index) => (
                <div key={index} className="hospital-section">
                    <h2>{hospital.hospitalName}</h2>
                    <div className="reviews-container">
                        {hospital.reviews.map((review, reviewIndex) => (
                            <div key={reviewIndex} className="review-card">
                                <div className="hospital-info">
                                    <p>ID: {review.userId}</p>
                                    <div className="dates">
                                        <p>생성일: {review.createdAt}</p>
                                        <p>수정일: {review.updatedAt}</p>
                                    </div>
                                    <div className="rating">
                                        <span>{'⭐'.repeat(review.rating)}</span>
                                        <span>{review.rating}</span>
                                    </div>
                                </div>
                                <div className="review-content">
                                    <p>{review.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllReviews;
