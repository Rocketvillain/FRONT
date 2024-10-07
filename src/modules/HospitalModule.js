import { useNavigate } from "react-router-dom";
import { createActions, handleActions } from "redux-actions";

const navigate = useNavigate;

/* 초기 state값 */
const initialState = {
    hospitals: [], // 병원 리스트 초기 상태
    hospital: {} // 병원 단일 정보 초기 상태 
};

/* 액션 타입 설정 */
export const ALL_HOSPITAL = 'hospital/ALL_HOSPITAL';
export const HOSPITAL_DETAIL = 'hospital/HOSPITAL_DETAIL';
export const RESET = 'hospital/RESET';
export const UPDATE_HOSPITAL = 'hospital/UPDATE_HOSPITAL';
export const ADMIN_UPDATE_HOSPITAL = 'hospital/ADMIN_UPDATE_HOSPITAL';
export const ADMIN_DELETE_HOSPITAL = 'hospital/ADMIN_DELETE_HOSPITAL';

/* 병원 관련 액션 함수 */
export const { hospital: { allHospital, hospitalDetail, reset, updateHospital, adminUpdateHospital, adminDeleteHospital } } = createActions({
    [ALL_HOSPITAL]: (data) => (data),
    [HOSPITAL_DETAIL]: (data) => (data), //파라미터 이름 정의(구조 맞춰줌)
    [RESET]: () => ({}),
    [UPDATE_HOSPITAL]: (data) => (data),
    [ADMIN_UPDATE_HOSPITAL]: (updatedHospital) => updatedHospital,
    [ADMIN_DELETE_HOSPITAL]: (hospitalId) => hospitalId,
});

/* 리듀서 함수 */
const hospitalReducer = handleActions(
    {
        [ALL_HOSPITAL]: (state, { payload }) => {

            console.log(payload);

            return {
                ...state,
                hospitals: payload,
            }

        },
        [HOSPITAL_DETAIL]: (state, { payload }) => {
            console.log(payload);

            return {
                ...state,
                hospital: payload,
            }

        },
        [UPDATE_HOSPITAL]: (state, { payload }) => {
            console.log(payload);

            return {
                ...state,
                hospital: payload,
            }

        },
        [ADMIN_UPDATE_HOSPITAL]: (state, { payload }) => ({
            ...state,
            hospitals: state.hospitals.map((hospital) =>
                hospital.id === payload.id ? { ...hospital, ...payload } : hospital
            ), // 상태가 변경된 병원 정보 업데이트
        }),
        [ADMIN_DELETE_HOSPITAL]: (state, { payload }) => ({
            ...state,
            hospitals: state.hospitals.filter(hospital => hospital.id !== payload), // 삭제된 병원 목록에서 제거
        }),
        [RESET]: () => {
            return initialState;
        },
    },
    initialState
);

export default hospitalReducer;