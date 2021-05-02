// React
import React, { Component, useEffect, useRef, useState } from "react";

// MUI Stuff
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowLeftRounded from "@material-ui/icons/ArrowLeftRounded";
import ArrowRightRounded from "@material-ui/icons/ArrowRightRounded";
import { makeStyles, MuiThemeProvider, withStyles } from "@material-ui/core/styles";

// Components / Modules
import ForumSearch from "../components/Home/ForumSearch";
import KeybindEditor from "../components/Home/KeybindEditor";
import Calendar from "../components/Calendar/Calendar";
import ModuleViewer from "../components/Modules/ModuleViewer";
import FullscreenModuleViewer from "../components/Modules/FullscreenModuleViewer";
import Fuse from "fuse.js";
// Redux
import { connect } from "react-redux";
import MusicModule from "../components/MusicModule/MusicModule";
import moment from "moment";
import Notifications from "../util/notifications";
import { Paper, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Pages from "../util/pageDictionary";
import { ModuleCard } from "../components/ModuleCard";
const CTime = (props) => {
  const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date()); // default value can be anything you want
  return (
    <div
      style={{
        verticalAlign: "middle",
        width: "100%",
        minWidth: "100%",
      }}
    >
      <Typography
        variant="h5"
        style={{
          fontSize: "5.5vw",
          textAlign: "left",
        }}
      >
        {
          /*moment().format(window.innerWidth <= 1368 ? "M/D/YYYY h:mm:ss A" : "dddd MMMM Do h:mm:ss A")*/ moment().format(
          "h:mm:ss A"
        )
        }
      </Typography>
      <Typography
        variant="h5"
        style={{
          fontSize: "2.5vw",
          textAlign: "left",
        }}
      >
        {
          /*moment().format(window.innerWidth <= 1368 ? "M/D/YYYY h:mm:ss A" : "dddd MMMM Do h:mm:ss A")*/ moment().format(
          "M/D/YYYY dddd"
        )
        }
      </Typography>
    </div>
  );
};
const CTimeSmall = (props) => {
  const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date()); // default value can be anything you want
  return (
    <div
      style={{
        verticalAlign: "middle",
        width: "100%",
        minWidth: "100%",
      }}
    >
      <Typography
        variant="h5"
        style={{
          fontSize: "10vw",
        }}
      >
        {
          /*moment().format(window.innerWidth <= 1368 ? "M/D/YYYY h:mm:ss A" : "dddd MMMM Do h:mm:ss A")*/ moment().format(
          "h:mm:ss A"
        )
        }
      </Typography>
      <Typography
        variant="h5"
        style={{
          fontSize: "5.65vw",
        }}
      >
        {
          /*moment().format(window.innerWidth <= 1368 ? "M/D/YYYY h:mm:ss A" : "dddd MMMM Do h:mm:ss A")*/ moment().format(
          "M/D/YYYY dddd"
        )
        }
      </Typography>
    </div>
  );
};
let lastTimeBasedNotif = 0;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  paper: {
    width: "80vw",
    height: "80vw",
    display: "inline-block",
  },
  title: {
    fontSize: "60px",
    // fontFamily: "",
  },
  formLabel: {
    display: "block",
  },
  formGroup: {
    display: "inline",
  },
}));
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
  return null;
}
const useForceUpdate = () => {
  const set = useState(0)[1];
  return () => set((s) => s + 1);
};
export const Home = (props) => {
  const {
    // classes,
    user: { authenticated },
  } = props;
  const forceUpdate = useForceUpdate();
  const classes = useStyles();
  const [rerenderPage, setRerenderPage] = useState(0);
  useEffect(() => {
    setTimeout(
      () => setInterval(forceUpdate, 125),
      1000 - (Date.now() % 1000)
    );
  }, [])

  const history = useHistory();
  const redirectToSchedule = () => {
    history.push("/schedule");
  }
  const getTimePhrase = () => {
    try {
      if (!localStorage.getItem("cachedSchedule")) return "";
      let scheduleOBJ = JSON.parse(localStorage.getItem("cachedSchedule"));
      let schedule = JSON.parse(scheduleOBJ.schedule.schedule);
      let user = JSON.parse(localStorage.getItem("user"));
      let allClasses = scheduleOBJ.classes;
      let convertedMoment = moment().tz(schedule.timePeriod).utcOffset();
      let currentMoment = moment().utcOffset();
      let currentTime = moment();
      let getPeriodName = (periodID) => {
        return (
          JSON.parse(scheduleOBJ.schedule.nameOverrides)[periodID] || "Break"
        );
      };
      let dotw = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ][moment().isoWeekday() - 1];
      let formattedClasses =
        schedule[dotw] &&
        schedule[dotw].map((clas) => {
          return {
            period: clas.period,
            timeStart:
              moment(clas.timeStart, "hh:mma")
                .add((convertedMoment - currentMoment) / 60, "hours")
                .unix() * 1000,
            timeEnd:
              moment(clas.timeEnd, "hh:mma")
                .add((convertedMoment - currentMoment) / 60, "hours")
                .unix() * 1000,
          };
        });
      //Check for current class first
      let currentClass = formattedClasses.filter(
        (x) => x.timeStart < Date.now() && Date.now() < x.timeEnd
      )[0];

      if (currentClass) {
        let endingInString = `${currentClass.timeEnd - Date.now() > 60000
          ? currentClass.timeEnd - Date.now() > 3600000
            ? `${Math.round(
              moment.duration(currentClass.timeEnd - Date.now()).asHours()
            )} hours`
            : `${Math.round(
              moment.duration(currentClass.timeEnd - Date.now()).asMinutes()
            )} minutes`
          : `${Math.round(
            moment.duration(currentClass.timeEnd - Date.now()).asSeconds()
          )} seconds`
          }`;

        //Try to push a notif if class is starting soon
        if (
          currentClass.timeEnd - Date.now() < 120 * 1000 &&
          Date.now() - lastTimeBasedNotif > 240 * 1000
        ) {
          lastTimeBasedNotif = Date.now();

          Notifications.pushNotification(
            undefined,
            undefined,
            `${getPeriodName(currentClass.period)} is ending soon!`,
            `Hey ${user.firstName}, ${getPeriodName(
              currentClass.period
            )} is about to end in ${endingInString}!`
          );
        }

        return `${getPeriodName(
          currentClass.period
        )} ends in ${endingInString}`;
      }
      //Check for next upcoming class
      let nextClass = formattedClasses.filter(
        (x) => x.timeStart > Date.now()
      )[0];

      if (nextClass) {
        let startingInString = `${nextClass.timeStart - Date.now() > 60000
          ? nextClass.timeStart - Date.now() > 3600000
            ? `${Math.round(
              moment.duration(nextClass.timeStart - Date.now()).asHours()
            )} hours`
            : `${Math.round(
              moment.duration(nextClass.timeStart - Date.now()).asMinutes()
            )} minutes`
          : `${Math.round(
            moment.duration(nextClass.timeStart - Date.now()).asSeconds()
          )} seconds`
          }`;
        if (
          nextClass.timeStart - Date.now() < 120 * 1000 &&
          Date.now() - lastTimeBasedNotif > 240 * 1000
        ) {
          lastTimeBasedNotif = Date.now();

          Notifications.pushNotification(
            undefined,
            undefined,
            `${getPeriodName(nextClass.period)} is starting soon!`,
            `Hey ${user.firstName}, ${getPeriodName(
              nextClass.period
            )} is about to start in ${startingInString}!`
          );
        }

        return `${getPeriodName(
          nextClass.period
        )} starts in ${startingInString}`;
      }

      //Check for what was the previous class
      let lastClass = formattedClasses
        .filter((x) => Date.now() > x.timeEnd)
        .pop();
      if (lastClass) {
        let lastEnded = `${Date.now() - lastClass.timeEnd > 60000
          ? Date.now() - lastClass.timeEnd > 60000
            ? `${Math.round(
              moment.duration(Date.now() - lastClass.timeEnd).asHours()
            )} hours`
            : `${Math.round(
              moment.duration(Date.now() - lastClass.timeEnd).asMinutes()
            )} minutes`
          : `${Math.round(
            moment.duration(Date.now() - lastClass.timeEnd).asSeconds()
          )} seconds`
          }`;
        return `${getPeriodName(lastClass.period)} ended ${lastEnded} ago`;
      }

      //If no classes exist for the day
      return `No classes today! Take a break, you deserve it :)`;
    } catch (error) {
      return "";
    }
  }
  const renderSearchPages = () => {
    const { UI: { theme } } = props;
    let query = document.getElementById("pageSearchBox")?.value;
    if (!query) return null;
    const fuseOptions = {
      includeScore: true,
      // Search in `author` and in `tags` array
      keys: ["name", "description", "tags"],
    };
    const pageArray = Object.values(Pages);
    const fuse = new Fuse(pageArray, fuseOptions);
    console.log(fuse
      .search(query)
      .filter((x, i) => i < 10));
    return <div>
      {React.Children.toArray(fuse
      .search(query)
      .filter((x, i) => i < 10)
      .map(result => {
        return (
          <ModuleCard icon={result.item.icon} name={result.item.name} desc={result.item.desc} path={result.item.path} color={theme ? result.item.defaultColorDarkMode : result.item.defaultColorLightMode} />
        );
      }))}

    </div>
    // ModuleCard
  }
  if (window.innerWidth >= 1250) {
    return (
      <div >

        <h1>HWBounty</h1>
        <Card onClick={redirectToSchedule} classes={classes.time} style={{
          position: "fixed",
          width: "30vw",
          maxHeight: "40%",
          borderRadius: 10,
          top: "10%",
          left: "5%",
          paddingLeft: 20,
          textAlign: "center",
        }}>
          {<CTime />}
          <Typography>{getTimePhrase()}</Typography>
        </Card>
        <Card style={{
          position: "fixed",
          width: "55vw",
          maxHeight: "30%",
          borderRadius: 10,
          top: "10%",
          left: "40%",
          textAlign: "center",
        }}>
          <form>
            <TextField placeholder={"Search for Page..."} label={"Search"} classes={classes.searchBox} id="pageSearchBox" style={{
              width: "90%",
            }} />
          </form>
        </Card>
        <Card style={{
          position: "fixed",
          width: "55vw",
          maxHeight: "40%",
          minHeight: "300px",
          height: "300px",
          borderRadius: 10,
          top: "30%",
          left: "40%",
          textAlign: "center",
          padding: "0",
          overflowX: "scroll",
        }}>
          {React.Children.toArray(renderSearchPages())}
        </Card>

        {/* <ForumSearch />
        <DesktopLayout />
        <MobileLayout /> */}
      </div>
    );
  }
  return null;

};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps)(Home);
