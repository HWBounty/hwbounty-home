// React
import React, { Component } from "react";

// MUI
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import makeStyles from "@material-ui/core/styles/makeStyles";
import moment from "moment";
import { useState } from "react";
import axios from "axios";
import { CircularProgress, Container } from "@material-ui/core";
import { linkUserSchoology } from "../../redux/actions/userActions"
import { getTheme } from "../Home/Navbar";
const decodeHTML = (string) => {
  const map = { gt: ">" /* , … */ };
  return string.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, ($0, $1) => {
    if ($1[0] === "#") {
      return String.fromCharCode(
        $1[1].toLowerCase() === "x"
          ? parseInt($1.substr(2), 16)
          : parseInt($1.substr(1), 10)
      );
    } else {
      return map.hasOwnProperty($1) ? map[$1] : $0;
    }
  });
};
const useButtonStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    marginTop: 10,
    paddingBottom: 10,
    display: "block",
    cursor: "pointer",
  },
});

const generatePeriodColors = (stops) => {
  let retarr = [];
  for (let index = 0; index < stops; index++)
    //50 => 25, 70 => 30 for Dark mode

    retarr.push([0 + (index / stops) * 360, getTheme() ? 30 : 50, getTheme() ? 30 : 70]);
  return retarr;
};

const PeriodButton = (props) => {
  const classes = useButtonStyles();
  const { period, name, zoom, color, timeStart, timeEnd, tSS, tES, duration } = props;
  //% from 0 to 100
  let timePassed = 0;
  //If we are past the end time, set time passed to 100%
  if (Date.now() - timeEnd > 0) timePassed = 100;
  //If we are in class, set time passed to (current-start)/(End-start) * 100
  else if (Date.now() - timeStart > 0 && timeEnd - Date.now() > 0) timePassed = (Date.now() - timeStart) * 100 / (timeEnd - timeStart);
  //If the class is upcoming, set time passed to 0
  else timePassed = 0;
  const [expanded, setExpanded] = React.useState(false);
  const handleButtonClicked = () => {
    if (zoom.length)
      setExpanded(!expanded);
  };

  const handleZoomLinkClicked = (event, link) => {
    event.stopPropagation();
    const newWindow = window.open(link, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  let notDoneCol = color.filter(x => true);
  //Set to 40 for Darkmode
  notDoneCol[2] = getTheme() ? 50 : 90;
  color[2] = getTheme() ? 40 : 80;
  return (
    <div style={{
      marginBottom: "2vh",
    }}>
      <Card
        className={classes.root}
        onClick={handleButtonClicked}
        style={{ background: `linear-gradient(90deg, hsl(${color[0]},${color[1]}%,${color[2]}%) 0%, hsl(${color[0]},${color[1]}%,${color[2]}%) ${timePassed}%, hsl(${notDoneCol[0]},${notDoneCol[1]}%,${notDoneCol[2]}%) ${timePassed + 0.000001}%, hsl(${notDoneCol[0]},${notDoneCol[1]}%,${notDoneCol[2]}%) 100%)` }}
      >
        <Typography variant="h5" align="left" style={{
          marginTop: "-2.3%",
          marginLeft: "4%",
          fontSize: window.innerWidth ** 0.4 + 48,
          marginBottom: 40,
        }}>
          {name}
        </Typography>
        {expanded ? null :
          <Typography align="left" variant="h5" style={{
            fontSize: window.innerWidth <=1250? window.innerWidth ** 0.3+16: window.innerWidth ** 0.4 + 16,
            margin: 10,
            marginBottom: 10,
            marginTop: 0,
            bottom: window.innerWidth <=1250? "70%": "1%",
            left: "5%",
            position: "absolute",
            fontFamily: "'Nunito'",
          }}>{period}</Typography>}
        {expanded ? null :
          <Typography align="right" variant="h5" style={{
            fontSize: window.innerWidth <=1250? window.innerWidth ** 0.3+16: window.innerWidth ** 0.4 + 16,
            margin: 10,
            marginBottom: 10,
            marginTop: 0,
            position: "absolute",
            bottom: "1%",
            right: "5%",
            fontFamily: "'Nunito'",
          }}>{tSS}-{tES} ({Math.round(duration / 60000)} mins)</Typography>}


        <Collapse in={expanded}>
          {React.Children.toArray(
            zoom.map((z) => {
              return (
                <Button onClick={(e) => handleZoomLinkClicked(e, z.link)} >
                  {z.title}
                </Button>
              );
            })
          )}
        </Collapse>
      </Card>
    </div>
  );
};
const parsePeriods = (scheduleData, zoomLinkInfo) => {
  let scheduleDay = moment(Date.now());
  let dotw = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ][scheduleDay.isoWeekday() - 1];

  let allClasses = scheduleData.classes;
  let classes = new Map();
  let nameOverrides = JSON.parse(scheduleData.schedule.nameOverrides);
  let convertedMoment = moment().tz(JSON.parse(scheduleData.schedule.schedule).timePeriod).utcOffset();
  let currentMoment = moment().utcOffset();
  zoomLinkInfo.forEach((x) => {
    classes.set(x.course.id, x);
  });
  let today = JSON.parse(scheduleData.schedule.schedule)[dotw];
  let colors = generatePeriodColors(today.length);
  return today.map((x, i) => {
    let courseInfo = classes.has(
      allClasses[x.period] && allClasses[x.period].value
    )
      ? classes.get(allClasses[x.period] && allClasses[x.period].value)
      : null;
    return {
      period: nameOverrides[x.period] || x.period,
      color: colors[i],
      name:
        courseInfo && courseInfo.course
          ? courseInfo.course.course_title
          : "No Class",
      zoom:
        courseInfo && courseInfo.links
          ? courseInfo.links
            .map((linkGroup) => {
              return linkGroup.links.map((link) => {
                return { link: link, title: decodeHTML(linkGroup.title) };
              });
            })
            .flat(10000)
          : [],
      timeStart: moment(x.timeStart, "hh:mma").add((convertedMoment - currentMoment) / 60, "hours").unix() * 1000,
      timeEnd: moment(x.timeEnd, "hh:mma").add((convertedMoment - currentMoment) / 60, "hours").unix() * 1000,
      tSS: x.timeStart,
      tES: x.timeEnd,
      duration: x.timeEnd - x.timeStart,
    };
  });
};
let done = false;
const fetchAndSet = async (setCourseInfo, setScheduleData, setCannotFetch) => {
  try {
    if (!localStorage.getItem("DBIdToken")) throw new Error("something bad happened?");
    if (localStorage.getItem("cachedSchedule"))
      setScheduleData(JSON.parse(localStorage.getItem("cachedSchedule")));
    if (localStorage.getItem("cachedCourseInfo"))
      setCourseInfo(JSON.parse(localStorage.getItem("cachedCourseInfo")));
    let [schedule, courses] = await Promise.all([
      axios.get("https://api.hwbounty.help/schedule/@me").catch(console.trace),
      axios.get("https://api.hwbounty.help/sgy/getZoomLinks").catch(console.trace),
    ]);
    if (!schedule?.data || !courses?.data || schedule?.status === 500) throw new Error("something bad happened?");
    localStorage.setItem("cachedCourseInfo", JSON.stringify(courses.data));
    localStorage.setItem("cachedSchedule", JSON.stringify(schedule.data));
    setScheduleData(schedule.data);
    setCourseInfo(courses.data);
  } catch (error) {
    setCannotFetch(true);
  }
};
export const Schedule = (props) => {
  const [courseInfo, setCourseInfo] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [fetching, setFetching] = useState(false)
  const [cannotFetch, setCannotFetch] = useState(false)
  if ((!scheduleData || !courseInfo)) {

    if (!fetching) {
      setFetching(true);
      fetchAndSet(setCourseInfo, setScheduleData, setCannotFetch);
      return null;
    }
    if (cannotFetch)
      return (
        <div>
          <Typography>Seems like you dont have a school account linked! Please link your schoology account to get access to this feature!</Typography>
          <Button variant="contained" onClick={x => {
            linkUserSchoology();
          }

          }>
            Link Schoology Account
        </Button>
        </div>


      )
    return (<div>
      <Typography>Fetching Schedule Data/ Zoom Links...</Typography>
      <CircularProgress />
    </div>);
  }
  console.log(scheduleData, courseInfo);
  if (!scheduleData?.schedule) return (
    <div>
      <Typography>Seems like you dont have a schedule setup! Please go over to the schedules catalog and set a schedule!</Typography>
    </div>)
  const periods = parsePeriods(scheduleData, courseInfo);
  return (
    <Container style={{ marginBottom: "50px", width: "100%", padding: "0px" }}>
      {React.Children.toArray(
        periods.map((p) => {
          return (
            <PeriodButton
              period={p.period}
              name={p.name}
              zoom={p.zoom}
              color={p.color}
              timeStart={p.timeStart}
              timeEnd={p.timeEnd}
              tSS={p.tSS}
              tES={p.tES}
              duration={p.timeEnd - p.timeStart}
            />
          );
        })
      )}
    </Container>
  );
};

export default Schedule;
