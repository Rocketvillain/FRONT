import { createActions, handleActions } from "redux-actions";


/* 초기 state 값 */
const initialState = {
    reviews: [], //리뷰 리스트 초기 상태
    

};


/* 액션 타입 설정 */
export const ALL_REVIEW = 'review/ALL_REVIEW';


/* 리뷰 관련 액션 함수 */
export const { review : { allReview }} = createActions({
    [ALL_REVIEW]: (data) => (data),

});


/* 리듀서 함수 */
const reviewReducer = handleActions(
    {
        [ALL_REVIEW]: (state, {payload}) => {
            console.log(payload);

            return{
                ...state,
                reviews: payload,
            }
            
        },
    
    },
    initialState
);

export default reviewReducer;