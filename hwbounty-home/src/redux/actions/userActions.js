import { SET_AUTHENTICATED } from "../types";

export const getUserData = () => (dispatch) => {
  console.log("get user data here");
};

export const logoutUser = () => (dispatch) => {
  console.log("you have unsuccessfully logged out! your stuck here forever!");
};

// btw  api.hwbounty.help/schoologyLogin
/*
req: {
  redirectURL:  "hwbounty.help"
}
*/
