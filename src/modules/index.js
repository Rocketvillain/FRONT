import { combineReducers } from "redux";
import userReducer from "./UserModule";
import hospitalReducer from "./HospitalModule";
import hospitalScheduleReducer from "./HospitalScheduleModule";
import adminUserReducer from "./AdminUserModule";


const rootReducer = combineReducers({
    user: userReducer, // user 리듀서를 user 키로 결합
    hospital: hospitalReducer,
    hospitalSchedule: hospitalScheduleReducer,
    adminUsers: adminUserReducer,
});

export default rootReducer;