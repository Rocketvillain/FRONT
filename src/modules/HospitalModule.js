import { useNavigate } from "react-router-dom";
import { createActions, handleActions } from "redux-actions";

const navigate = useNavigate

/* 초기 state값 */
const initialState = {
    hospitals: [] // 병원 리스트 초기 상태
};

/* 액션 타입 설정 */
export const ALL_HOSPITAL = 'hospital/ALL_HOSPITAL';

/* 유저 관련 액션 함수 */
export const { hospital : { allHospital }} = createActions({
    [ALL_HOSPITAL]: (data) => (data),
});

/* 리듀서 함수 */
const hospitalReducer = handleActions(
    {   
        [ALL_HOSPITAL]: (state, { payload }) => {

            console.log(payload);
            
            return {
                ...state,
                hospitals:  payload, 
            }

        },

    },
    initialState
);

export default hospitalReducer;

