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
const CTime = (props) => {
  const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date()) // default value can be anything you want

  useEffect(() => {
    setTimeout(() => setFakeCurrentDate(new Date()), 33);
  }, [fakeCurrentDate])
  return <Typography variant="h5" style={
    {
      fontSize: 64,
      fontFamily: "'Work Sans', sans-serif",
    }
  }>{moment().format(window.innerWidth <=1000? "M/D/YYYY h:mm:ss A" : "dddd MMMM Do h:mm:ss A")}</Typography>
}
class JHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
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
  // getBio() {
  //   if (this.state.user) {
  //     if (!localStorage.getItem("user"))
  //       localStorage.setItem("user", JSON.stringify(this.state.user));
  //     return `“ ${this.state.user.bio} ”`;
  //   }
  //   axios.get("https://api.hwbounty.help/@me").then((res) => {
  //     if (res.status === 200 && res.data && res.data.password) {
  //       this.setState({ user: res.data });
  //       localStorage.setItem("user", JSON.stringify(res.data));
  //     }
  //   });
  //   if (localStorage.getItem("user")) {
  //     return `“ ${JSON.parse(localStorage.getItem("user")).bio} ”`;
  //   }
  // }
  getTimePhrase() {
    if (!localStorage.getItem("cachedSchedule")) return "";
    let scheduleOBJ = JSON.parse(localStorage.getItem("cachedSchedule"));
    let schedule = JSON.parse(scheduleOBJ.schedule.schedule);

    //Get current time 
    
    let allClasses = scheduleOBJ.classes;
    let convertedMoment = moment().tz(schedule.timePeriod).utcOffset();
    let currentMoment = moment().utcOffset();
    // currentMoment = currentMoment.utcOffset();
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
    //scheduleOBJ.schedule.timePeriod || "America/Los_Angeles");
    // console.log(schedule[dotw],moment(schedule[dotw][0].timeStart,"hh:mma").format("dddd MMMM Do h:mm:ss A"));
    console.log(convertedMoment,currentMoment,`Macau is ${(convertedMoment-currentMoment)/60} hours ahead of Cali`,currentTime.format("dddd MMMM Do h:mm:ss A"));
    let formattedClasses = schedule[dotw]&& schedule[dotw].map(clas=>{
      return {
        period: clas.period,
        timeStart: moment(clas.timeStart,"hh:mma").add((convertedMoment-currentMoment)/60,"hours").unix()*1000,
        timeEnd: moment(clas.timeEnd,"hh:mma").add((convertedMoment-currentMoment)/60,"hours").unix()*1000,
      }
    })

    let currentClass = formattedClasses.filter(x=>  x.timeStart < Date.now() && Date.now() < x.timeEnd  )[0];
    if (currentClass) return `${getPeriodName(currentClass.period)} ends in ${Math.round(moment.duration(currentClass.timeEnd-Date.now()).asMinutes())} minutes`
    let nextClass = formattedClasses.filter(x=>x.timeStart > Date.now())[0];
    console.log(formattedClasses.filter(x=>x.timeStart > Date.now()));
    if (nextClass) return `${getPeriodName(nextClass.period)} ${moment(nextClass.timeStart).fromNow()}`
    let lastClass = formattedClasses.filter(x=>Date.now() > x.timeEnd).pop();
    if (lastClass) return `${getPeriodName(lastClass.period)} ended ${moment(lastClass.timeStart).fromNow()}`
    return `No classes today! Take a break, you deserve it :)`
    // schedule[dotw] 
  }
  render() {
    this.getGreeting();
    return (
      <div className="base" id="baseHome">
        <Container
          className="base"
          style={{
            backgroundColor: `rgb(50,150,150)`,
            minHeight: "10vh",
            maxWidth: "100vw",
            width: "100%",
            // "margin-left": "0px",
            // "margin-right": "0px",
            // "text-align": "left",
            // overflow: "hidden",
            // "text-overflow": "ellipsis",
            // position: "relative",
          }}
        >
          {/* <div id="pfp"
          style={{
            background: `url(${JSON.parse(localStorage.getItem("user")).pfp})center/cover`,
            display: "inline-block",
          }}
          /> */}
          <div id="welcomeTextDiv">
            <CTime />
            {
              <Typography variant="h5" id="welcomeText">
                {this.getTimePhrase()}
              </Typography>
            }

          </div>


          {/* <h1 id="welcomeText">nyaaaa
        {
          (()=>{
            
            if (this.state.user){
              if (!localStorage.getItem("user"))
              localStorage.setItem("user",JSON.stringify(this.state.user));
              return `Welcome back ${this.state.user.firstName} 👋!`;
            }
            axios.get("https://api.hwbounty.help/@me").then(res=>{
              if (res.status == 200 && res.data && res.data.password){
                this.setState({user:res.data});
              } 
            })
            if (localStorage.getItem("user")){
              return `Welcome back ${JSON.parse(localStorage.getItem("user")).firstName} 👋!`;
            }
          })()
          }
          </h1> */}
        </Container>
        <Card id="calenderContainer">
          <Calendar id="calender" />
        </Card>
      </div>
    );
  }
}

export default connect()(JHome);