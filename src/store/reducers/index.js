import campaignReducer from "./campaignReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  campaigns: campaignReducer
});

export default reducers;
