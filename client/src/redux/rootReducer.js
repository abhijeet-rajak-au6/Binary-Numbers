import { combineReducers } from "redux";
import userReducer from "./reducer/userReducer";
import alertReducer from "./reducer/alertReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  alertState: alertReducer,
});

export default rootReducer;
