import {
  SET_AUTHENTICATED,
  LOADING_UI,
  CLEAR_ERRORS,
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
      },500);
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
axios.post(`${hwbountyAPI}/schoologyLogin`,{
  redirectURL: `${window.origin}/schoologyCallback`
}).then(res=>res.status === 200 && (window.location.href = res.data))
}
export const logoutUser = () => (dispatch) => {
};
export const getUserData = () => async (dispatch) => {
  let data = await axios.get("https://api.hwbounty.help/@me").catch(console.trace);
		if (data && data.status === 200 && data.data){
			localStorage.setItem("user",JSON.stringify(data.data));
		}else{
			localStorage.clear();
		}
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
