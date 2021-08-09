// React
import React, { useEffect, useState } from "react";

// MUI
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import makeStyles from "@material-ui/core/styles/makeStyles";
import moment from "moment-timezone";
import { Container } from "@material-ui/core";

// Redux
import { connect } from "react-redux";
import { linkUserSchoology } from "../../redux/actions/userActions";

import axios from "axios";
// Translations
import t from "../../util/localization/localization";
import { useSnackbar } from "notistack";


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
    borderRadius: "1rem!important",
    marginTop: "2vw",
    paddingBottom: 10,
    display: "block",
    cursor: "pointer",
    position: "relative",
    boxShadow: (theme) =>
      theme === 1
        ? "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)!important"
        : "0 3px 6px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.01)!important",
  },
});

const generatePeriodColors = (stops, theme) => {
  return [
    [248, 255, 229],
    [6, 214, 160],
    [27, 154, 170],
    [44, 66, 63],
    [255, 196, 61],
    [232, 93, 117],
    [153, 95, 163],
    [255, 74, 28],
  ].splice(0, stops);

};

const PeriodButton = (props) => {
  const classes = useButtonStyles();
  const {
    theme,
    period,
    name,
    zoom,
    color,
    timeStart,
    timeEnd,
    tSS,
    tES,
    duration,
    nofill,
    periodID,
  } = props;
  //% from 0 to 100
  const { enqueueSnackbar } = useSnackbar();
  let timePassed = 0;
  //If we are past the end time, set time passed to 100%
  if (nofill > 0) timePassed = 0;
  else if (nofill < 0) timePassed = 100;
  else if (Date.now() - timeEnd > 0) timePassed = 100;
  //If we are in class, set time passed to (current-start)/(End-start) * 100
  else if (Date.now() - timeStart > 0 && timeEnd - Date.now() > 0)
    timePassed = ((Date.now() - timeStart) * 100) / (timeEnd - timeStart);
  //If the class is upcoming, set time passed to 0
  else timePassed = 0;
  const [expanded, setExpanded] = React.useState(false);
  const handleButtonClicked = () => {
    if (zoom.length) setExpanded(!expanded);
    else enqueueSnackbar("No Zoom Links found for this class!");
  };

  const handleZoomLinkClicked = (event, link) => {
    event.stopPropagation();
    const newWindow = window.open(link, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  let notDoneCol = color.filter((x) => true);

  //Set to 40 for Darkmode
  notDoneCol[2] = theme ? 76 : 90;
  color[2] = theme ? 60 : 80;
  console.log(period)
  if (periodID === "break") {
    notDoneCol[2] = theme ? 1 : 100;
    color[2] = theme ? 10 : 95;
  }
  return (
    <div
      style={{
        marginBottom: "2vh",
      }}
    >
      <Card
        className={classes.root}
        onClick={handleButtonClicked}
        style={{
          background: `linear-gradient(90deg, hsl(${color[0]},${color[1]}%,${color[2]
            }%) 0%, hsl(${color[0]},${color[1]}%,${color[2]
            }%) ${timePassed}%, hsl(${notDoneCol[0]},${notDoneCol[1]}%,${notDoneCol[2]
            }%) ${timePassed + 0.000001}%, hsl(${notDoneCol[0]},${notDoneCol[1]
            }%,${notDoneCol[2]}%) 100%)`,
          borderRadius: "0.1rem!important",
          padding: "10px",
        }}
      >
        <Typography
          variant="h5"
          align="left"
          style={{
            marginLeft: "4%",
            fontSize: window.innerWidth ** 0.4 + 32,
            marginBottom: window.innerWidth <= 960 ? "12%" : "6%",
            position: "relative",
            marginTop: window.innerWidth <= 960 ? "4%" : "2%",
            // left: "5%"
          }}
        >
          {name}
        </Typography>
        {expanded ? null : (
          <Typography
            align="left"
            variant="h5"
            style={{
              fontSize:
                window.innerWidth <= 960
                  ? window.innerWidth ** 0.3 + 10
                  : window.innerWidth ** 0.4 + 10,
              margin: 10,
              marginBottom: 10,
              marginTop: 0,
              bottom: window.innerWidth <= 960 ? "70%" : "1%",
              left: "4%",
              bottom: "10%",
              position: "absolute",
              fontFamily: "'Nunito'",
            }}
          >
            {t("schedule.minsFormatting", {
              period,
              tSS,
              tES,
              mins: Math.round(duration / 60000),
            })}
          </Typography>
        )}

        <Collapse in={expanded}>
          {React.Children.toArray(
            zoom.map((z) => {
              return (
                <Button onClick={(e) => handleZoomLinkClicked(e, z.link)}>
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

const parsePeriods = (scheduleData, zoomLinkInfo, theme, offset) => {
  let scheduleDay = moment(Date.now());
  let ogHasOffset = offset;
  if (offset)
    offset = (scheduleDay.isoWeekday() - 1 + (((offset % 7) + 7) % 7)) % 7;
  else offset = scheduleDay.isoWeekday() - 1;
  let dotw = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ][offset];
  let allClasses = scheduleData.classes || {};
  let classes = new Map();
  let nameOverrides = JSON.parse(scheduleData.schedule.nameOverrides);
  let convertedMoment = moment()
    .tz(JSON.parse(scheduleData.schedule.schedule).timePeriod)
    .utcOffset();
  let currentMoment = moment().utcOffset();
  if (zoomLinkInfo?.length)
    zoomLinkInfo.forEach((x) => {
      classes.set(x.course.id, x);
    });
  let today = JSON.parse(scheduleData.schedule.schedule)[dotw];
  let colors = generatePeriodColors(today.length, theme);
  return today
    .map((x, i) => {
      let courseInfo = classes.has(
        allClasses[x.period] && allClasses[x.period].value
      )
        ? classes.get(allClasses[x.period] && allClasses[x.period].value)
        : null;
      // if (!(courseInfo) && x.period !== "break") return null;
      return {
        period: nameOverrides[x.period] || x.period,
        periodID: x.period,
        color: colors[i],
        name:
          courseInfo && courseInfo.course
            ? courseInfo.course.course_title
            : nameOverrides[x.period],
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
        timeStart:
          moment(x.timeStart, "hh:mma")
            .add((convertedMoment - currentMoment) / 60, "hours")
            .unix() * 1000,
        timeEnd:
          moment(x.timeEnd, "hh:mma")
            .add((convertedMoment - currentMoment) / 60, "hours")
            .unix() * 1000,
        tSS: x.timeStart,
        tES: x.timeEnd,
        duration: x.timeEnd - x.timeStart,
        nofill: ogHasOffset,
      };
    })
    .filter((x) => x);
};
let done = false;
const fetchAndSet = async (setCourseInfo, setScheduleData, setCannotFetch) => {
  try {
    if (!localStorage.getItem("DBIdToken"))
      throw new Error("something bad happened?");
    if (localStorage.getItem("cachedSchedule"))
      setScheduleData(JSON.parse(localStorage.getItem("cachedSchedule")));
    if (localStorage.getItem("cachedCourseInfo"))
      setCourseInfo(JSON.parse(localStorage.getItem("cachedCourseInfo")));
    let [schedule, courses] = await Promise.all([
      axios.get("https://api.hwbounty.help/schedule/@me").catch(console.trace),
      axios
        .get("https://api.hwbounty.help/sgy/getZoomLinks")
        .catch(console.trace),
    ]);
    // if (!schedule?.data || !courses?.data || schedule?.status === 500)
    // 	throw new Error("something bad happened?");
    localStorage.setItem(
      "cachedCourseInfo",
      JSON.stringify(!courses?.data ? {} : courses.data)
    );
    localStorage.setItem("cachedSchedule", JSON.stringify(schedule.data));
    setScheduleData(schedule.data);
    setCourseInfo(courses.data);
  } catch (error) {
    console.trace(error);
    setCannotFetch(true);
  }
};
const useForceUpdate = () => {
  const set = useState(0)[1];
  return () => set((s) => s + 1);
};
export const Schedule = (props) => {
  const {
    UI: { theme },
  } = props;
  const dayOffset = props.dayOffset;
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    const id = setTimeout(
      () => setInterval(() => forceUpdate(), 5000),
      1000 - (Date.now() % 1000)
    );
    return () => clearTimeout(id);
  }, []);
  const [courseInfo, setCourseInfo] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [cannotFetch, setCannotFetch] = useState(false);
  if (!scheduleData || !courseInfo) {
    if (!fetching) {
      setFetching(true);
      fetchAndSet(setCourseInfo, setScheduleData, setCannotFetch);
      return null;
    }
    if (cannotFetch)
      return (
        <div>
          <Typography>{t("schedule.linkSchoologyPrompt")}</Typography>
          <Button
            variant="contained"
            onClick={(x) => {
              linkUserSchoology();
            }}
          >
            {t("schedule.linkSchoology")}
          </Button>
        </div>
      );
    return (
      <div>
        <Typography>{t("schedule.fetching")}</Typography>
        <CircularProgress />
      </div>
    );
  }
  if (!scheduleData?.schedule)
    return (
      <div>
        <Typography>{t("schedule.noSchedule")}</Typography>
      </div>
    );
  const periods = parsePeriods(scheduleData, courseInfo, theme, dayOffset);
  return (
    <Container style={{ marginBottom: "50px", width: "100%", padding: "0px" }}>
      {React.Children.toArray(
        periods.map((p) => {
          return (
            <PeriodButton
              theme={theme}
              period={p.period}
              name={p.name}
              zoom={p.zoom}
              color={p.color}
              timeStart={p.timeStart}
              timeEnd={p.timeEnd}
              tSS={p.tSS}
              tES={p.tES}
              duration={p.timeEnd - p.timeStart}
              nofill={p.nofill}
              periodID={p.periodID}
            />
          );
        })
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps)(Schedule);
