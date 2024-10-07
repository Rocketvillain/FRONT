import { adminGetAllUsers } from "../modules/UserModule";
import { request } from "./Apis";
import { adminUpdateHospital, adminDeleteHospital } from '../modules/HospitalModule';
import { adminGetAllReservations } from '../modules/AdminReserModule';
import { adminGetAllReviews } from "../modules/AdminReviewModule";

// 관리자용 전체 유저 조회 API 호출
export function adminGetAllUsersAPI() {
    return async (dispatch) => {
        try {
            const result = await request('GET', '/api/v1/user');
            console.log('result:', result);
            dispatch(adminGetAllUsers(result.results.users));
        } catch (error) {
            console.error('API error:', error);
        }
    };
}

// 관리자용 유저 상태 변경 API 호출
export function adminDeactivateUserAPI(userId) {
    return async (dispatch) => {

        const token = localStorage.getItem('token');

        // 여기에서 토큰을 확인
        console.log('adminDeactivateUserAPI에서의 토큰:', token);

        try {
            // PUT 요청으로 사용자의 상태를 secession으로 변경
            await request('PUT', `/api/v1/user/${userId}/userState`);
            dispatch(adminGetAllUsersAPI()); // 상태 변경 후 사용자 목록을 다시 가져옴
        } catch (error) {
            console.error('API error:', error);
        }
    };
}

// 관리자용 병원 수정 API 호출
export function adminUpdateHospitalAPI(hospitalId, updatedHospital) {
    return async (dispatch) => {
        try {
            const result = await request('PUT', `/api/v1/hospital/${hospitalId}`, updatedHospital); // 병원 수정 API 호출
            dispatch(adminUpdateHospital(result.hospital)); // 수정된 병원 정보를 Redux 상태에 반영
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    };
}

// 관리자용 병원 삭제 API 호출
export function adminDeleteHospitalAPI(hospitalId) {
    return async (dispatch) => {
        try {
            await request('DELETE', `/api/v1/hospital/${hospitalId}`); // 병원 삭제 API 호출
            dispatch(adminDeleteHospital(hospitalId));
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    };
}

// 관리자용 예약 전체 조회 API 호출
export function adminGetAllReservationsAPI() {
    return async (dispatch) => {
        try {
            const result = await request('GET', '/api/v1/reservation'); // API 호출
            console.log('result:', result); // 결과 로그
            dispatch(adminGetAllReservations(result.results.reservations)); // 가져온 예약 데이터를 Redux에 저장
        } catch (error) {
            console.error('API error:', error);
        }
    };
}

// 관리자용 전체 리뷰 조회 API 호출
export function adminGetAllReviewsAPI() {
    return async (dispatch) => {
        try {
            const result = await request('GET', '/api/v1/review'); // 백엔드에서 리뷰 데이터를 가져옴
            console.log('API response:', result);
            console.log('adminGetAllReviews :', adminGetAllReviews);

            dispatch(adminGetAllReviews(result.results.review)); // 가져온 리뷰 데이터를 Redux 상태에 저장
        } catch (error) {
            console.error('API error:', error);
        }
    };
}



