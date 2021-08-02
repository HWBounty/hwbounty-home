import { SET_ASSIGNMENTS, SET_SCHEDULE, hwbountyAPI } from "../types";

import axios from "axios";

export const getAssignments = () => (dispatch) => {
  const tmpAssignments = [
    {
      title: "This is a test assignment",
      url: "https://google.com",
      due: "2021-3-15", // will be in the form of ISO Date...
      id: ";SKDjf;slkx;d",
    },
    {
      title: "the the middle",
      url: "https://example.com",
      due: "2021-2-1",
      id: "sjdjfksld",
    },
    {
      title: "Due on same day??",
      url: "https://usaco.org",
      due: "2021-3-15",
      id: "Randos ass id bruhhhh",
    },
    {
      title: "another assigment",
      url: "https://facebook.com",
      due: "2021-4-1",
      id: ";LSKDjfs;lkdf",
    },
  ];

  dispatch({ type: SET_ASSIGNMENTS, payload: tmpAssignments });
};

export const updateSchedule = () => (dispatch) => {
  axios
    .get(`${hwbountyAPI}/schedule/@me`)
    .then((res) => {
      if (res && res.status === 200) {
        localStorage.setItem("cachedSchedule", JSON.stringify(res.data));
        dispatch({ type: SET_SCHEDULE, payload: res.data });
      }
    })
    .catch(() => {});

  // leave zoom links to local storage
  axios
    .get(`${hwbountyAPI}/sgy/getZoomLinks`)
    .then((data) => {
      if (data && data.status === 200) {
        localStorage.setItem("cachedCourseInfo", JSON.stringify(data.data));
      }
    })
    .catch(() => {});
};
