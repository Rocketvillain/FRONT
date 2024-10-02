import { adminGetAllUsers } from "../modules/AdminUserModule";
import { request } from "./Apis";

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
        try {
            // PUT 요청으로 사용자의 상태를 secession으로 변경
            await request('PUT', `/api/v1/user/${userId}`, {
                user_state: 'secession',
            });
            dispatch(adminGetAllUsersAPI()); // 상태 변경 후 사용자 목록을 다시 가져옴
        } catch (error) {
            console.error('API error:', error);
        }
    };
}

