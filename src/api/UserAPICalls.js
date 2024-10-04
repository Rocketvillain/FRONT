import { loginRequest, request } from "./Apis"; 
import { loadUserInfo, login, updateUser, loadPetInfo } from "../modules/UserModule";
import { Navigate } from "react-router-dom";

/* 로그인 정보 전달 받는 함수 */
export function callLoginAPI(loginInfo) {
    

    console.log('login api calls...');

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

// 유저 정보 불러오기
export function getUserInfo(userId) {

    console.log('유저 정보 불러오기...');

    return async (dispatch) => {

        try {
            const result = await request('GET', `/api/v1/user/${userId}`);
            console.log('result : ', result); // 서버에서 받아온 data 정보

            const data = result.results.user;
            console.log('data :', data);
            
            dispatch(loadUserInfo(data))

            return result; // 포장한 데이터를 반환해주기.


        } catch (error) {
            console.error('API error:', error);
        }
    }
}

// 유저 정보 수정
export function updateUserInfo(id,modifyUserInfo) {

    console.log('유저 정보 수정...');

    return async (dispatch) => {

        try {
            const result = await request('PUT', `/api/v1/user/${id}`, modifyUserInfo);
            console.log('result : ', result); // 서버에서 받아온 data 정보

            const data = result.results.user;

            dispatch(updateUser(data));

            return result; // 포장한 데이터를 반환해주기.


        } catch (error) {
            console.error('API error:', error);
        }
    }
}

// 유저의 펫 정보 불러오기
export function getPetInfo(userId) {

    console.log('유저 펫 정보 불러오기...');

    return async (dispatch) => {

        try {
            const result = await request('GET', `/api/v1/pets/${userId}`);
            console.log('result : ', result); // 서버에서 받아온 data 정보

            const data = result.results.pets;
            console.log('data :', data);
            
            dispatch(loadPetInfo(data))

            return result; // 포장한 데이터를 반환해주기.

        } catch (error) {
            console.error('API error:', error);
        }
    }
}

// 유저의 펫 정보 수정오기
export function updatePetInfo(petId, modifyPetInfo) {

    console.log('유저 펫 정보 수정하기...');

    return async (dispatch) => {

        try {
            const result = await request('PUT', `/api/v1/pets/${petId}`, modifyPetInfo);
            console.log('result : ', result); // 서버에서 받아온 data 정보

            // const data = result.results.pets;
            // console.log('data :', data);
            
            return result; // 포장한 데이터를 반환해주기.

        } catch (error) {
            console.error('API error:', error);
        }
    }
}

// ✨함수 정의 예시✨
export function allHospitalAPI() {

    console.log('api 사용 예시 호출...');

    /* redux-thunk(미들 웨어)를 이용한 비동기 처리 */
    return async (dispatch, getState) => {
        try {
            // 서버에 API 요청
            const result = await request('GET', '/api/v1/hospital');
            console.log('result : ', result); // 서버에서 받아온 data 정보 

            // 받아온 데이터(result)안에 담긴 내용을 알맞게 포장하시면 됩니다. 

            return result; // 포장한 데이터를 반환해주기.
        } catch (error) {
            console.error('API error:', error);
        }
    }
}

function updateLocalStorage() {

}