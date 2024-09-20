import { combineReducers } from "redux";
import userReducer from "./UserModule";

const rootReducer = combineReducers({
    userReducer,
});

export default rootReducer;