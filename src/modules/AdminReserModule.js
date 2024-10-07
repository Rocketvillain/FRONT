import { createActions, handleActions } from 'redux-actions';

/* 초기 상태 */
const initialState = {
    reservations: [], // 예약 목록을 저장하는 배열
};

/* 액션 타입 정의 */
export const ADMIN_GET_ALL_RESERVATIONS = 'ADMIN_GET_ALL_RESERVATIONS';

/* 액션 생성 함수 */
export const { adminGetAllReservations } = createActions({
    ADMIN_GET_ALL_RESERVATIONS: (reservations) => reservations, // 전체 예약 목록을 받아와서 저장
});

/* 리듀서 */
const adminReserReducer = handleActions(
    {
        /* 전체 예약 정보 불러오기 */
        [ADMIN_GET_ALL_RESERVATIONS]: (state, { payload }) => ({
            ...state,
            reservations: payload, // 예약 데이터를 상태로 저장
        }),
    },
    initialState
);

export default adminReserReducer;
