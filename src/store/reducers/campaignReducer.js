import {
  GET_CAMPAIGN_DATA_ASYNC,
  SET_CAMPAIGN_DATA_ASYNC
} from "../actions/types";

const initialState = {
  data: []
};

const campaignReducer = (state = initialState, action) => {
  console.log("reducer");
  switch (action.type) {
    case GET_CAMPAIGN_DATA_ASYNC:
      return { ...action.payload };
    case SET_CAMPAIGN_DATA_ASYNC:
      return { ...action.payload };
    default:
      return { ...state };
  }
};

export default campaignReducer;
