import { createActions, handleActions } from 'redux-actions';

/* 초기 상태 */
const initialState = {
    users: [], // 사용자 목록을 저장하는 배열
};

/* 액션 타입 정의 */
export const ADMIN_GET_ALL_USERS = 'ADMIN_GET_ALL_USERS';
export const ADMIN_UPDATE_USER_STATE = 'ADMIN_UPDATE_USER_STATE';

/* 액션 생성 함수 */
export const { adminGetAllUsers, adminUpdateUserState } = createActions({
    ADMIN_GET_ALL_USERS: (users) => users, // 전체 사용자 목록을 받음
    ADMIN_UPDATE_USER_STATE: (updatedUser) => updatedUser, // 상태가 변경된 사용자 정보 받음
});

/* 리듀서 */
const adminUserReducer = handleActions(
    {
        /* 전체 사용자 목록을 상태에 저장 */
        [ADMIN_GET_ALL_USERS]: (state, { payload }) => ({
            ...state,
            users: payload, // 서버에서 받아온 사용자 목록을 상태에 저장
        }),

        /* 특정 사용자의 상태를 secession으로 변경 */
        [ADMIN_UPDATE_USER_STATE]: (state, { payload }) => ({
            ...state,
            users: state.users.map((user) =>
                user.id === payload.id ? { ...user, userState: payload.userState } : user
            ), // 상태가 변경된 사용자 업데이트
        }),
    },
    initialState
);

export default adminUserReducer;
