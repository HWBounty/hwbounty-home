import {
  SET_AUTHENTICATED,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_USER,
  hwbountyAPI,
} from "../types";
import axios from "axios";

export const loginUser = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${hwbountyAPI}/login`, userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signupUser = (userData) => (dispatch) => {
  axios
    .post(`${hwbountyAPI}/signup`, userData)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => console.log(err));
};

export const linkUserSchoology = () => {
  axios
    .post(`${hwbountyAPI}/schoologyLogin`, {
      redirectURL: `${window.origin}/schoologyCallback`,
    })
    .then((res) => res.status === 200 && (window.location.href = res.data));
};

export const logoutUser = () => (dispatch) => { };

export const getUserData = () => (dispatch) => {
  axios
    .get("https://api.hwbounty.help/@me")
    .then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch(console.trace);
};

export const useVanityInviteAnonymously = (inviteData) => (dispatch) => {
  console.log("setting")
  localStorage.setItem("anonStorage", JSON.stringify({
    schedule: inviteData.schedule,
  }));
  axios.post(`${hwbountyAPI}/useAnonymousInvite`, { invite: inviteData.inviteID }).catch(console.trace)
};
export const setAuthorizationHeader = (token) => {
  const DBIdToken = `Bearer ${token}`;
  localStorage.setItem("DBIdToken", DBIdToken);
  axios.defaults.headers.common["Authorization"] = DBIdToken;
};

// btw  api.hwbounty.help/schoologyLogin
/*
req: {
  redirectURL:  "hwbounty.help"
}
*/
