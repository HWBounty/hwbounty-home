// React
import React, { Component, useEffect, useState } from "react";
import "../pages/home.css";
// MUI Stuff
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowLeftRounded from "@material-ui/icons/ArrowLeftRounded";
import ArrowRightRounded from "@material-ui/icons/ArrowRightRounded";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";

// Components / Modules
import ForumSearch from "../components/Home/ForumSearch";
import KeybindEditor from "../components/Home/KeybindEditor";
import Calendar from "../components/Calendar/Calendar";
import ModuleViewer from "../components/Modules/ModuleViewer";

// Redux
import { connect } from "react-redux";
import axios from "axios";
import { Avatar, Container, makeStyles } from "@material-ui/core";
import { Calculator } from "../components/Modules/Calculator/Calculator";
import { getRandomBackground } from "../util/randomBackground";
import momenttz from "moment-timezone";
import moment from "moment";
import Notifications from "../util/notifications";
import Schedule from "../components/Calendar/Schedule";
let lastTimeBasedNotif = 0;
const CTime = (props) => {
  const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date()) // default value can be anything you want

  useEffect(() => {
    setTimeout(() => setFakeCurrentDate(new Date()), 33);
  }, [fakeCurrentDate])
  return <Typography variant="h5" style={
    {
      fontSize: 64,
      fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
    }
  }>{moment().format(window.innerWidth <= 1000 ? "M/D/YYYY h:mm:ss A" : "dddd MMMM Do h:mm:ss A")}</Typography>
}
class JHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    setTimeout(()=>{
      setInterval(() => {
        this.forceUpdate();
      }, 1000);
    },1000-(Date.now()%1000))

  }
  getGreeting() {
    if (this.state.user) {
      if (!localStorage.getItem("user"))
        localStorage.setItem("user", JSON.stringify(this.state.user));
    } else {
      axios.get("https://api.hwbounty.help/@me").then((res) => {
        if (res.status == 200 && res.data && res.data.password) {
          this.setState({ user: res.data });
        }
      }).catch(console.trace);
    }
    if (localStorage.getItem("user")) {
      return `Welcome back ${JSON.parse(localStorage.getItem("user")).firstName
        } 👋!`;
    }
  }
  getTimePhrase() {
    if (!localStorage.getItem("cachedSchedule")) return "";
    let scheduleOBJ = JSON.parse(localStorage.getItem("cachedSchedule"));
    let schedule = JSON.parse(scheduleOBJ.schedule.schedule);
    let user = JSON.parse(localStorage.getItem("user"));
    let allClasses = scheduleOBJ.classes;
    let convertedMoment = moment().tz(schedule.timePeriod).utcOffset();
    let currentMoment = moment().utcOffset();
    let currentTime = moment();
    let getPeriodName = (periodID) => {
      return JSON.parse(scheduleOBJ.schedule.nameOverrides)[periodID] || "Break";
    }
    let dotw =
      [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ][moment().isoWeekday() - 1];
    let formattedClasses = schedule[dotw] && schedule[dotw].map(clas => {
      return {
        period: clas.period,
        timeStart: moment(clas.timeStart, "hh:mma").add((convertedMoment - currentMoment) / 60, "hours").unix() * 1000,
        timeEnd: moment(clas.timeEnd, "hh:mma").add((convertedMoment - currentMoment) / 60, "hours").unix() * 1000,
      }
    })
    //Check for current class first
    let currentClass = formattedClasses.filter(x => x.timeStart < Date.now() && Date.now() < x.timeEnd)[0];

    if (currentClass) {

      let endingInString = `${currentClass.timeEnd - Date.now() > 60000 ?
        currentClass.timeEnd - Date.now() > 3600000 ?
          `${Math.round(moment.duration(currentClass.timeEnd - Date.now()).asHours())} hours` :
          `${Math.round(moment.duration(currentClass.timeEnd - Date.now()).asMinutes())} minutes` :
        `${Math.round(moment.duration(currentClass.timeEnd - Date.now()).asSeconds())} seconds`}`;

      //Try to push a notif if class is starting soon
      if (currentClass.timeEnd - Date.now() < 120 * 1000 && Date.now() - lastTimeBasedNotif > 240 * 1000) {
        lastTimeBasedNotif = Date.now();

        Notifications.pushNotification(undefined, undefined,
          `${getPeriodName(currentClass.period)} is ending soon!`,
          `Hey ${user.firstName}, ${getPeriodName(currentClass.period)} is about to end in ${endingInString}!`);
      }


      return `${getPeriodName(currentClass.period)} ends in ${endingInString}`
    }
    //Check for next upcoming class
    let nextClass = formattedClasses.filter(x => x.timeStart > Date.now())[0];

    if (nextClass) {
      let startingInString = `${nextClass.timeStart - Date.now() > 60000 ?
        nextClass.timeStart - Date.now() > 3600000 ?
          `${Math.round(moment.duration(nextClass.timeStart - Date.now()).asHours())} hours` :
          `${Math.round(moment.duration(nextClass.timeStart - Date.now()).asMinutes())} minutes` :
        `${Math.round(moment.duration(nextClass.timeStart - Date.now()).asSeconds())} seconds`}`;
      if (nextClass.timeStart - Date.now() < 120 * 1000 && Date.now() - lastTimeBasedNotif > 240 * 1000) {
        lastTimeBasedNotif = Date.now();

        Notifications.pushNotification(undefined, undefined,
          `${getPeriodName(nextClass.period)} is starting soon!`,
          `Hey ${user.firstName}, ${getPeriodName(nextClass.period)} is about to start in ${startingInString}!`);
      }

      return `${getPeriodName(nextClass.period)} starts in ${startingInString}`;

    }

    //Check for what was the previous class
    let lastClass = formattedClasses.filter(x => Date.now() > x.timeEnd).pop();
    if (lastClass) {
      let lastEnded = `${Date.now() - lastClass.timeEnd > 60000 ?
        Date.now() - lastClass.timeEnd > 60000 ?
          `${Math.round(moment.duration(Date.now() - lastClass.timeEnd).asHours())} hours` :
          `${Math.round(moment.duration(Date.now() - lastClass.timeEnd).asMinutes())} minutes` :
        `${Math.round(moment.duration(Date.now() - lastClass.timeEnd).asSeconds())} seconds`}`;
      return `${getPeriodName(lastClass.period)} ended ${lastEnded} ago`;
    }

    //If no classes exist for the day
    return `No classes today! Take a break, you deserve it :)`
  }
  render() {
    this.getGreeting();
    return (
      <div className="base" id="baseHome">
        {/* <Container
          className="base"
          style={{
            backgroundColor: `rgb(50,150,150)`,
            minHeight: "calc(10vh,100)",
            maxWidth: "100vw",
            width: "100%",
          }}
        >
          <div id="welcomeTextDiv" style={{
            margin: 10
          }}>
            <CTime />
            <Typography variant="h5" id="welcomeText">
              {this.getTimePhrase()}
            </Typography>
          </div>
        </Container> */}
        <Card id="calenderContainer">
          <Calendar id="calender" />
        </Card>
      </div>
    );
  }
}

export default connect()(JHome);