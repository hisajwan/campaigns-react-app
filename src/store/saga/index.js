import { getCampaignWatcher, setCampaignWatcher } from "./campaignSaga";
import { all, fork } from "redux-saga/effects";

export function* saga() {
  console.log("saga");
  yield all([fork(getCampaignWatcher, setCampaignWatcher)]);
}
