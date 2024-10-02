import { combineReducers } from "redux";
import userReducer from "./UserModule";
import hospitalReducer from "./HospitalModule";
import reservationReducer from "./ReservationModule";


const rootReducer = combineReducers({
    user: userReducer, // user 리듀서를 user 키로 결합
    hospital: hospitalReducer,
    reservation: reservationReducer,
});

export default rootReducer;