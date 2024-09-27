import { useNavigate } from "react-router-dom";
import { createActions, handleActions } from "redux-actions";

const navigate = useNavigate;

/* 초기 state값 */
const initialState = {
    userInfo: [],
};

/* 액션 타입 설정 */
export const LOGIN = 'user/LOGIN';
export const RESET_LOGIN_USER = 'user/RESET_LOGIN_USER';
export const LOAD_USER_INFO = 'user/LOAD_USER_INFO';
export const UPDATE_USER = 'user/UPDATE_USER';

/* 유저 관련 액션 함수 */
export const { user : { login, resetLoginUser, loadUserInfo, updateUser }} = createActions({
    [LOGIN]: ({ token, userInfo }) => ({ token, userInfo }),
    [RESET_LOGIN_USER]: (res = initialState) => ({ res }),
    [LOAD_USER_INFO]: (data) => (data),
    [UPDATE_USER]: (modifyUserInfo) => ( modifyUserInfo ),
});

/* 리듀서 함수 */
const userReducer = handleActions(
    {   
        [LOGIN]: (state, { payload: { token, userInfo } }) => {

            // localStorage에 로그인 상태 저장
            localStorage.setItem("token", token); // 토큰 저장

            return {
                ...state,
                userInfo: userInfo,
            }

            
        },
        [RESET_LOGIN_USER]: (state) => {
            localStorage.removeItem('token');  // 로그인 토큰 삭제
            localStorage.removeItem("role");

            return initialState;
        },
        [LOAD_USER_INFO]: (state, data) => {

            console.log('data : ', data);
            

            return {
                ...state,
                userInfo: data.payload, // 상태 업데이트
            };
        },
        [UPDATE_USER]: (state, modifyUserInfo) => {

            console.log('modifyUserInfo : ', modifyUserInfo);

            return {
                ...state,
                userInfo: modifyUserInfo.payload, // 상태 업데이트
            };
        },
    },
    initialState
);

export default userReducer;

