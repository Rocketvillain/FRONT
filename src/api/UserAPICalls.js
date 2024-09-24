import { loginRequest } from "./Apis"; 
import { login } from "../modules/UserModule";
import { Navigate } from "react-router-dom";

/* 로그인 정보 전달 받는 함수 */
export function callLoginAPI(loginInfo) {

    console.log('login api calls...');

    /* redux-thunk(미들 웨어)를 이용한 비동기 처리 */
    return async (dispatch, getState) => {
        try {
            // 서버에 로그인 요청
            const result = await loginRequest('POST', '/login', loginInfo);
            console.log('login result : ', result); // 서버에서 반환된 유저 정보

            if (result.data.failType) {
                return result.data.failType; // 로그인 실패
            } 

            // 로그인 성공 시 action dispatch
            const token = result.headers['authorization']; // 'Bearer <token>' 형식
            const userInfo = result.data.userInfo; // 사용자 정보 획득
            dispatch(login({ token, userInfo }));

            return true; // 로그인 성공
        } catch (error) {
            console.error('Login API error:', error);
            return false; // 로그인 실패
        }
    }
}
