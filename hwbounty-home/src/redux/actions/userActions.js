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

export const logoutUser = () => (dispatch) => {
  console.log("you have unsuccessfully logged out! your stuck here forever!");
};
export const loginUser = (userData, history) => (dispatch) => {
  // dispatch({ type: LOADING_UI });
  return new Promise((res, rej) => {
    axios
      .post(`https://api.hwbounty.help/login`, userData)
      .then((result) => {
        setAuthorizationHeader(result.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push("/");
        res(true);
      })
      .catch((err) => {
        // dispatch({
        //   type: SET_ERRORS,
        //   payload: err.response.data,
        // });
        // console.log(err.message);
        res(false);
      });
  })

};
export const signupUser = async (userData) => {
  let res = await axios.post(`https://api.hwbounty.help/signup`, userData).catch(console.error);
  if (!res) return false;
  console.log(res.data);
  if (res.data.complete) {
    Array.from(document.getElementsByTagName("input")).forEach(x => {x.disabled = true;x.value = ""});
    document.getElementById("goButton").disabled = true;
    document.getElementById("goButton").innerText = "Please Check Your Inbox!";
    alert("Your account is now pending confirmation! Please go into your email and click on the verification link!");
  }
  return res.data.complete;
}

export const getUserData = () => (dispatch) => {
  console.log("get user data here");
};

const setAuthorizationHeader = (token) => {
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

const setAuthorizationHeader = (token) => {
  const DBIdToken = `Bearer ${token}`;
  localStorage.setItem("DBIdToken", DBIdToken);
  axios.defaults.headers.common["Authorization"] = DBIdToken;
};