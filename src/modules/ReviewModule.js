import { createActions, handleActions } from "redux-actions";


/* 초기 state 값 */
const initialState = {
    reviews: [], //리뷰 리스트 초기 상태
    review: [], // 리뷰 단일 정보 초기 상태 
    

};


/* 액션 타입 설정 */
export const ALL_REVIEW = 'review/ALL_REVIEW';
export const REVIEW_DETAIL = 'review/REVIEW_DETAIL';


/* 리뷰 관련 액션 함수 */
export const { review : { allReview, reviewDetail }} = createActions({
    [ALL_REVIEW]: (data) => (data),
    [REVIEW_DETAIL] : (data) => (data),

});


/* 리듀서 함수 */
const reviewReducer = handleActions(
    {
        [ALL_REVIEW]: (state, { payload }) => {
            console.log(payload);

            return{
                ...state,
                reviews: payload,
            }
            
        },
        [REVIEW_DETAIL]: (state, { payload }) => {
            console.log(payload);

            return {
                ...state,
                hospital: payload,
            }
            
        },

    },
    initialState
);

export default reviewReducer;