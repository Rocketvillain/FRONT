import { request } from "./Api"; 
import { login } from "../modules/UserModule";

/* 로그인 정보 전달 받는 함수 */
export function callLoginAPI(loginInfo) {
    
    console.log('login api calls...');

    /* redux-thunk(미들 웨어)를 이용한 비동기 처리 */
    return async (dispatch, getState) => {
        try {
            // 서버에 로그인 요청
            const result = await request('POST', '/login', loginInfo);

            console.log('login result : ', result); // 서버에서 반환된 유저 정보

            // 로그인 성공 시 action dispatch
            dispatch(login(result));

        } catch (error) {
            console.error('Login failed: ', error);

            // 실패 시 에러 액션 디스패치
            // dispatch(loginFailure(error));
        }
    }
}
