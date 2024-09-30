import { useNavigate } from "react-router-dom";
import { createActions, handleActions } from "redux-actions";

const navigate = useNavigate

/* 초기 state값 */
const initialState = {
    hospitals: [], // 병원 리스트 초기 상태
    hospital: [],  // 병원 단일 정보 초기 상태
    schedules: [], // 병원 일정 초기 상태
    loading: false,
    error: null
};


/* 액션 타입 설정 */
export const ALL_HOSPITAL = 'hospital/ALL_HOSPITAL';
export const HOSPITAL_DETAIL = 'hospital/HOSPITAL_DETAIL';
/* 병원 일정 관련 액션 타입 설정 */
export const FETCH_HOSPITAL_SCHEDULES = 'hospital/FETCH_HOSPITAL_SCHEDULES';
export const ADD_HOSPITAL_SCHEDULE = 'hospital/ADD_HOSPITAL_SCHEDULE';
export const UPDATE_HOSPITAL_SCHEDULE = 'hospital/UPDATE_HOSPITAL_SCHEDULE';
export const DELETE_HOSPITAL_SCHEDULE = 'hospital/DELETE_HOSPITAL_SCHEDULE';



/* 병원 관련 액션 함수 */
export const {
    hospital: { allHospital, hospitalDetail },
    hospitalSchedules: {
        fetchHospitalSchedules,
        addHospitalSchedule,
        updateHospitalSchedule,
        deleteHospitalSchedule
    }
} = createActions({
    [ALL_HOSPITAL]: (data) => data,
    [HOSPITAL_DETAIL]: (data) => data,

    /* 병원 일정 관련 액션 */
    [FETCH_HOSPITAL_SCHEDULES]: (data) => data,
    [ADD_HOSPITAL_SCHEDULE]: (data) => data,
    [UPDATE_HOSPITAL_SCHEDULE]: (data) => data,
    [DELETE_HOSPITAL_SCHEDULE]: (scheduleId) => scheduleId
});


/* 리듀서 함수 */
const hospitalReducer = handleActions(
    {
        [ALL_HOSPITAL]: (state, { payload }) => {
            console.log(payload);
            return {
                ...state,
                hospitals: payload,
            };
        },

        [HOSPITAL_DETAIL]: (state, { payload }) => {
            console.log(payload);
            return {
                ...state,
                hospital: payload,
            };
        },

        /* 병원 일정 관련 리듀서 처리 */
        [FETCH_HOSPITAL_SCHEDULES]: (state, { payload }) => {
            return {
                ...state,
                schedules: payload,
                loading: false,
            };
        },

        [ADD_HOSPITAL_SCHEDULE]: (state, { payload }) => {
            return {
                ...state,
                schedules: [...state.schedules, payload],
            };
        },

        [UPDATE_HOSPITAL_SCHEDULE]: (state, { payload }) => {
            return {
                ...state,
                schedules: state.schedules.map(schedule =>
                    schedule.id === payload.id ? payload : schedule
                ),
            };
        },

        [DELETE_HOSPITAL_SCHEDULE]: (state, { payload }) => {
            return {
                ...state,
                schedules: state.schedules.filter(schedule => schedule.id !== payload),
            };
        },
    },
    initialState
);

export default hospitalReducer;


