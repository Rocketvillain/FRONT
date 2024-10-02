import { createActions, handleActions } from "redux-actions";

/* 초기 state값 */
const initialState = {
    Reservations: [],
};

/* 액션 타입 설정 */
export const GET_RESERVATION = 'reservation/GET_RESERVATION';

/* 유저 관련 액션 함수 */
export const { reservation : { getReservation }} = createActions({
    [GET_RESERVATION]: (data) => (data),
});

/* 리듀서 함수 */
const reservationReducer = handleActions(
    {   
        [GET_RESERVATION]: (state, data) => {

            console.log('data : ', data);
            
            return {
                ...state,
                Reservations: data.payload, // 상태 업데이트
            };
        },
        
    },
    initialState
);

export default reservationReducer;

