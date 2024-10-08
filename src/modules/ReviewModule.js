import { createActions, handleActions } from 'redux-actions';

/* 초기 상태 */
const initialState = {
    reviews: [], // 리뷰 데이터를 저장하는 배열
};

/* 액션 타입 정의 */
export const ALL_REVIEW = 'ALL_REVIEW';  // 사용자 리뷰 조회 액션 타입
export const ADMIN_GET_ALL_REVIEWS = 'ADMIN_GET_ALL_REVIEWS'; // 관리자 리뷰 조회 액션 타입

/* 액션 생성 함수 */
export const { allReview, adminGetAllReviews } = createActions({
    [ALL_REVIEW]: (data) => data,                // 사용자 리뷰 액션 생성 함수
    [ADMIN_GET_ALL_REVIEWS]: (reviews) => reviews // 관리자 리뷰 액션 생성 함수
});

/* 리듀서 */
const reviewReducer = handleActions(
    {
        /* 사용자 리뷰 목록을 상태에 저장 */
        [ALL_REVIEW]: (state, { payload }) => ({
            ...state,
            reviews: payload, // 서버에서 받아온 사용자 리뷰 목록을 상태에 저장
        }),

        /* 관리자 리뷰 목록을 상태에 저장 */
        [ADMIN_GET_ALL_REVIEWS]: (state, { payload }) => ({
            ...state,
            reviews: payload, // 서버에서 받아온 관리자 리뷰 목록을 상태에 저장
        }),
    },
    initialState
);

export default reviewReducer;
