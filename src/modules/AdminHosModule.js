import { createActions, handleActions } from 'redux-actions';

/* 초기 상태 */
const initialState = {
    hospitals: [], // 병원 목록을 저장하는 배열
};

/* 액션 타입 정의 */
export const ADMIN_UPDATE_HOSPITAL = 'ADMIN_UPDATE_HOSPITAL';
export const ADMIN_DELETE_HOSPITAL = 'ADMIN_DELETE_HOSPITAL';

/* 액션 생성 함수 */
export const { adminGetAllHospitals, adminUpdateHospital, adminDeleteHospital } = createActions({
    ADMIN_UPDATE_HOSPITAL: (updatedHospital) => updatedHospital, // 업데이트된 병원 정보
    ADMIN_DELETE_HOSPITAL: (hospitalId) => hospitalId, // 삭제할 병원의 ID
});

/* 리듀서 */
const adminHospitalReducer = handleActions(
    {
        /* 특정 병원의 정보를 업데이트 */
        [ADMIN_UPDATE_HOSPITAL]: (state, { payload }) => ({
            ...state,
            hospitals: state.hospitals.map((hospital) =>
                hospital.id === payload.id ? { ...hospital, ...payload } : hospital
            ), // 상태가 변경된 병원 정보 업데이트
        }),

        /* 특정 병원을 삭제 */
        [ADMIN_DELETE_HOSPITAL]: (state, { payload }) => ({
            ...state,
            hospitals: state.hospitals.filter(hospital => hospital.id !== payload), // 삭제된 병원을 목록에서 제거
        }),
    },
    initialState
);

export default adminHospitalReducer;
