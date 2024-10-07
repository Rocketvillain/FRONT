import { createActions, handleActions } from 'redux-actions';

/* 초기 상태 */
const initialState = {
    reviews: [], // 리뷰 데이터를 저장하는 배열
};

/* 액션 타입 정의 */
export const ADMIN_GET_ALL_REVIEWS = 'ADMIN_GET_ALL_REVIEWS';

/* 액션 생성 함수 */
export const { adminGetAllReviews } = createActions({
    ADMIN_GET_ALL_REVIEWS: (reviews) => reviews, // 전체 리뷰 목록을 받음
});

/* 리듀서 */
const adminReviewReducer = handleActions(
    {
        /* 전체 리뷰 목록을 상태에 저장 */
        [ADMIN_GET_ALL_REVIEWS]: (state, { payload }) => ({
            ...state,
            reviews: payload, // 서버에서 받아온 리뷰 목록을 상태에 저장
        }),
    },
    initialState
);

export default adminReviewReducer;
