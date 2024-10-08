import { createActions, handleActions } from 'redux-actions';

/* 초기 상태 */
const initialState = {
    reservations: [], // 예약 목록을 저장하는 배열 (유저와 관리자 공통)
};

/* 액션 타입 정의 */
export const GET_RESERVATION = 'reservation/GET_RESERVATION';   // 유저 예약 조회 액션 타입
export const ADMIN_GET_ALL_RESERVATIONS = 'reservation/ADMIN_GET_ALL_RESERVATIONS'; // 관리자 예약 조회 액션 타입
export const RESET = 'reservation/RESET';  // 초기 상태로 리셋하는 액션 타입

/* 액션 생성 함수 */
export const { reservation: { getReservation, reset, adminGetAllReservations }} = createActions({
    [GET_RESERVATION]: (data) => data,                // 유저 예약 조회 액션 생성 함수
    [ADMIN_GET_ALL_RESERVATIONS]: (reservations) => reservations, // 관리자 예약 조회 액션 생성 함수
    [RESET]: () => ({}),                              // 초기화 액션 생성 함수
});

/* 리듀서 */
const reservationReducer = handleActions(
    {
        /* 유저 예약 목록을 상태에 저장 */
        [GET_RESERVATION]: (state, { payload }) => {
            console.log('유저 예약 데이터: ', payload);
            return {
                ...state,
                reservations: payload, // 유저 예약 데이터를 상태에 저장
            };
        },

        /* 관리자 예약 목록을 상태에 저장 */
        [ADMIN_GET_ALL_RESERVATIONS]: (state, { payload }) => {
            console.log('관리자 예약 데이터: ', payload);
            return {
                ...state,
                reservations: payload, // 관리자 예약 데이터를 상태에 저장
            };
        },

        /* 상태 초기화 */
        [RESET]: () => ({
            ...initialState,
        }),
    },
    initialState
);

export default reservationReducer;
