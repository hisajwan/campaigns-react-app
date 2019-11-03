import { getCampaignWatcher, setCampaignWatcher } from "./campaignSaga";
import { all } from "redux-saga/effects";

export function* saga() {
  yield all([getCampaignWatcher(), setCampaignWatcher()]);
  // yield all([fork(getCampaignWatcher, setCampaignWatcher)]);
}
