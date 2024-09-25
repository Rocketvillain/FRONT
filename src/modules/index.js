import { combineReducers } from "redux";
import userReducer from "./UserModule";
import hospitalReducer from "./HospitalModule";


const rootReducer = combineReducers({
    user: userReducer,
    hospital: hospitalReducer,
});

export default rootReducer;