import { useNavigate } from "react-router-dom";
import { createActions, handleActions } from "redux-actions";

const navigate = useNavigate

/* 초기 state값 */
const initialState = {};

/* 액션 타입 설정 */
export const LOGIN = 'user/LOGIN';
export const RESET_LOGIN_USER = 'user/RESET_LOGIN_USER';

/* 유저 관련 액션 함수 */
export const { user : { login, resetLoginUser }} = createActions({
    [LOGIN]: ({ token, userInfo }) => ({ token, userInfo }),
    [RESET_LOGIN_USER]: (res = initialState) => ({ res }),
});

/* 리듀서 함수 */
const userReducer = handleActions(
    {   
        [LOGIN]: (state, { payload: { token, userInfo } }) => {

            // localStorage에 로그인 상태 저장
            localStorage.setItem("token", token); // 토큰 저장
            localStorage.setItem("userInfo", JSON.stringify(userInfo)); // JSON 형식으로 저장
            localStorage.setItem("role", userInfo.userRole); 
            
        },
        [RESET_LOGIN_USER]: () => {
            localStorage.removeItem('token');  // 로그인 토큰 삭제
            localStorage.removeItem("userInfo");
            localStorage.removeItem("role");

            return initialState;
        },
    },
    initialState
);

export default userReducer;

