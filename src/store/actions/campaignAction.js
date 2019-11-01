import { GET_CAMPAIGN_DATA, SET_CAMPAIGN_DATA } from "./types";
export const getCampaigns = input => {
  console.log("action");
  return {
    type: GET_CAMPAIGN_DATA
  };
};

export const setCampaigns = input => {
  console.log("action");
  return {
    type: SET_CAMPAIGN_DATA,
    payload: input
  };
};
