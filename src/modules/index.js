import { combineReducers } from "redux";
import userReducer from "./UserModule";
import hospitalReducer from "./HospitalModule";


const rootReducer = combineReducers({
    user: userReducer, // user 리듀서를 user 키로 결합
    hospital: hospitalReducer,
});

export default rootReducer;