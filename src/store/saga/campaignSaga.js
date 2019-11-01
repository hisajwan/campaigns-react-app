import { takeLatest, put } from "redux-saga/effects";
import {
  GET_CAMPAIGN_DATA,
  GET_CAMPAIGN_DATA_ASYNC,
  SET_CAMPAIGN_DATA,
  SET_CAMPAIGN_DATA_ASYNC
} from "../actions/types";
import { campaignsData } from "../../assets/mockData/campaignsData";

function* getCampaignWorker(action) {
  yield put({ type: GET_CAMPAIGN_DATA_ASYNC, payload: campaignsData });
}

export function* getCampaignWatcher() {
  yield takeLatest(GET_CAMPAIGN_DATA, getCampaignWorker);
}

function* setCampaignWorker(action) {
  yield put({ type: SET_CAMPAIGN_DATA_ASYNC, payload: action.payload });
}

export function* setCampaignWatcher() {
  yield takeLatest(SET_CAMPAIGN_DATA, setCampaignWorker);
}
