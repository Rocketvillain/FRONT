// 예약 정보 api 요청
import { getReservation } from "../modules/ReservationModule";
import { request } from "./Apis";

export function LoadReservation(hosId) {

    console.log('예약정보 불러오기...');

    return async (dispatch) => {
        try {
            // 서버에 API 요청
            const result = await request('GET', `/api/v1/reservation/hospital/${hosId}`);
            console.log('Reservations : ', result); // 서버에서 받아온 data 정보 

            dispatch(getReservation(result.results.reservations));
            return result; // 포장한 데이터를 반환해주기.
        } catch (error) {
            console.error('API error:', error);
        }
    }
}

export function LoadReservationByUserId(userId) {

    console.log('사용자에 대한 예약정보 불러오기...');

    return async (dispatch) => {
        try {
            // 서버에 API 요청
            const result = await request('GET', `/api/v1/reservation/user/${userId}`);
            console.log('Reservations : ', result); // 서버에서 받아온 data 정보 

            dispatch(getReservation(result.results.reservations));
            return result; // 포장한 데이터를 반환해주기.
        } catch (error) {
            console.error('API error:', error);
        }
    }
}

export function CreateReservation(reservationInfo) {

    console.log('예약 등록하기...');

    return async (dispatch) => {
        try {
            // 서버에 API 요청
            const result = await request('POST', `/api/v1/reservation`, reservationInfo);
            console.log('createdReservation : ', result); // 서버에서 받아온 data 정보 

            // dispatch(getReservation(result.results.reservations));

            return result; // 포장한 데이터를 반환해주기.
        } catch (error) {
            console.error('API error:', error);
        }
    }
}

export function RemoveReservation(reservationId) {

    console.log('예약 삭제하기...');

    return async (dispatch) => {
        try {
            // 서버에 API 요청
            const result = await request('DELETE', `/api/v1/reservation/${reservationId}`);
            console.log('result',result);

            return result; // 포장한 데이터를 반환해주기.
        } catch (error) {
            console.error('API error:', error);
        }
    }
}

export function CancelReservation(data) {

    console.log('예약 취소하기...');

    return async (dispatch) => {
        try {
            // 서버에 API 요청
            const result = await request('PUT', `/api/v1/reservation/${data.reservationId}`, data);
            console.log('result',result);

            return result; // 포장한 데이터를 반환해주기.
        } catch (error) {
            console.error('API error:', error);
        }
    }
}