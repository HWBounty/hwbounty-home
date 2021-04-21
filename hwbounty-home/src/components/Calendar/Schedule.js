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
import { Container } from "@material-ui/core";
const decodeHTML = (string) => {
  const map = { "gt": ">" /* , … */ };
  return string.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, ($0, $1) => {
    if ($1[0] === "#") {
      return String.fromCharCode($1[1].toLowerCase() === "x" ? parseInt($1.substr(2), 16) : parseInt($1.substr(1), 10));
    } else {
      return map.hasOwnProperty($1) ? map[$1] : $0;
    }
  });
};
const useButtonStyles = makeStyles({
  root: {
    //background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    //boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    marginTop: 10,
    paddingBottom: 10,
    display: "block",
    cursor: "pointer",
  },
});
const generatePeriodColors = (stops) => {
  let retarr = [];
  for (let index = 0; index < stops; index++)
    retarr.push(`hsl(${index / stops * 360}, 90%, 78%)`);
  return retarr;
}
const PeriodButton = (props) => {
  const classes = useButtonStyles();
  const { period, name, zoom, color } = props;

  const [expanded, setExpanded] = React.useState(false);
  const handleButtonClicked = () => {
    setExpanded(!expanded);
  };

  const handleZoomLinkClicked = (event, link) => {
    event.stopPropagation();
    const newWindow = window.open(link, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div>
      <Card
        className={classes.root}
        onClick={handleButtonClicked}
        style={{ background: color }}
      >
        <Typography variant="h5" display="block">
          {period}
        </Typography>
        <Typography align="left">{name}</Typography>
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
const parsePeriods = (scheduleData, zoomLinkInfo) => {
  let scheduleDay = moment(Date.now());
  let dotw = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"][scheduleDay.isoWeekday() -1];
  let allClasses = (scheduleData.classes);
  let classes = new Map();
  let nameOverrides = JSON.parse(scheduleData.schedule.nameOverrides);

  zoomLinkInfo.forEach(x => {
    classes.set(x.course.id, x);
  });
  let today = JSON.parse(scheduleData.schedule.schedule)[dotw]
  
  if (!today || !today.length){
    return [{
      period: "No Classes Today!",
      color: "rgb(204,255,153)",
      name: "No Class Found!",
      zoom: [],
    }]
  }
  let colors = generatePeriodColors(today.length);
  return today.map((x, i) => {
    let courseInfo = classes.has(allClasses[x.period] && allClasses[x.period].value) ? classes.get(allClasses[x.period] && allClasses[x.period].value) : null
    return {
      period: nameOverrides[x.period] || x.period,
      color: colors[i],
      name: courseInfo && courseInfo.course ? courseInfo.course.course_title : "No Class Found!",
      zoom: courseInfo && courseInfo.links ? courseInfo.links.map(linkGroup => {
        // { link: "https://example.com", title: "Office hours" }
        return linkGroup.links.map(link => {
          return { link: link, title: decodeHTML(linkGroup.title) }
        })
        //Gotta get the array as flat as a board :)
      }).flat(10000) : [],
    };
  });

}
// [
//   {
//       "course": {
//           "id": "2772297879",
//           "course_title": "APCompSci A",
//           "course_code": "118553",
//           "course_id": "2772295922",
//           "school_id": "1569031",
//           "building_id": "7924989",
//           "access_code": "",
//           "section_title": "2 Bautista (2491B 2 FY)",
//           "section_code": "",
//       },
//       "links": [
//           {
//               "title": "Paley&#039;s Zoom Office Hours (anyone welcome)",
//               "links": [
//                   "https://pausd.zoom.us/j/2680427016"
//               ]
//           },
//           {
//               "title": "Period 2 Zoom Link - AP CSA (Mr. Bautista)",
//               "links": [
//                   "https://pausd.zoom.us/j/98997767306?pwd=Mzc4NFdkWEViNDF3REdzOEJtOVhldz09"
//               ]
//           },
//           {
//               "title": "Bautista Office Hours",
//               "links": [
//                   "https://pausd.zoom.us/j/94007598185?pwd=RzRTdVhqdmdoVGV6Q2lVdlRKQ1Bydz09"
//               ]
//           }
//       ]
//   },


// {
//   "schedule": {
//       "id": 1,
//       "public": 1,
//       "schedule": "{\"timePeriod\":\"PST\",\"monday\":[{\"period\":\"period1\",\"timeStart\":\"10:00am\",\"timeEnd\":\"10:30am\"},{\"period\":\"period2\",\"timeStart\":\"10:40am\",\"timeEnd\":\"11:10am\"},{\"period\":\"period3\",\"timeStart\":\"11:20am\",\"timeEnd\":\"11:50am\"},{\"period\":\"period4\",\"timeStart\":\"12:00pm\",\"timeEnd\":\"12:35pm\"},{\"period\":\"break\",\"timeStart\":\"12:35pm\",\"timeEnd\":\"1:05pm\"},{\"period\":\"period5\",\"timeStart\":\"1:15pm\",\"timeEnd\":\"1:45pm\"},{\"period\":\"period6\",\"timeStart\":\"1:55pm\",\"timeEnd\":\"2:25pm\"},{\"period\":\"period7\",\"timeStart\":\"2:35pm\",\"timeEnd\":\"3:05pm\"}],\"tuesday\":[{\"period\":\"period1\",\"timeStart\":\"9:00am\",\"timeEnd\":\"10:15am\"},{\"period\":\"period2\",\"timeStart\":\"10:25am\",\"timeEnd\":\"11:40am\"},{\"period\":\"break\",\"timeStart\":\"11:40am\",\"timeEnd\":\"12:10pm\"},{\"period\":\"period3\",\"timeStart\":\"12:20pm\",\"timeEnd\":\"1:40pm\"},{\"period\":\"period4\",\"timeStart\":\"1:50pm\",\"timeEnd\":\"3:05pm\"},{\"period\":\"period8\",\"timeStart\":\"3:10pm\",\"timeEnd\":\"3:40pm\"}],\"wednesday\":[{\"period\":\"period5\",\"timeStart\":\"9:40am\",\"timeEnd\":\"10:55am\"},{\"period\":\"period9\",\"timeStart\":\"11:05am\",\"timeEnd\":\"11:40am\"},{\"period\":\"break\",\"timeStart\":\"11:40am\",\"timeEnd\":\"12:10pm\"},{\"period\":\"period6\",\"timeStart\":\"12:20pm\",\"timeEnd\":\"1:40pm\"},{\"period\":\"period7\",\"timeStart\":\"1:50pm\",\"timeEnd\":\"3:05pm\"},{\"period\":\"period8\",\"timeStart\":\"3:10pm\",\"timeEnd\":\"3:40pm\"}],\"thursday\":[{\"period\":\"period1\",\"timeStart\":\"9:00am\",\"timeEnd\":\"10:15am\"},{\"period\":\"period2\",\"timeStart\":\"10:25am\",\"timeEnd\":\"11:40am\"},{\"period\":\"break\",\"timeStart\":\"11:40am\",\"timeEnd\":\"12:10pm\"},{\"period\":\"period3\",\"timeStart\":\"12:20pm\",\"timeEnd\":\"1:40pm\"},{\"period\":\"period4\",\"timeStart\":\"1:50pm\",\"timeEnd\":\"3:05pm\"},{\"period\":\"period8\",\"timeStart\":\"3:10pm\",\"timeEnd\":\"3:40pm\"}],\"friday\":[{\"period\":\"period5\",\"timeStart\":\"9:40am\",\"timeEnd\":\"10:55am\"},{\"period\":\"period9\",\"timeStart\":\"11:05am\",\"timeEnd\":\"11:40am\"},{\"period\":\"break\",\"timeStart\":\"11:40am\",\"timeEnd\":\"12:10pm\"},{\"period\":\"period6\",\"timeStart\":\"12:20pm\",\"timeEnd\":\"1:40pm\"},{\"period\":\"period7\",\"timeStart\":\"1:50pm\",\"timeEnd\":\"3:05pm\"},{\"period\":\"period8\",\"timeStart\":\"3:10pm\",\"timeEnd\":\"3:40pm\"}],\"saturday\":[],\"sunday\":[]}",
//       "name": "Gunn HS Schdeule",
//       "description": "This is the **first** schedule that was added to HWBounty!",
//       "schoolCalLink": null,
//       "createdBy": 0,
//       "nameOverrides": "{\"period1\":\"Period 1\",\"period2\":\"Period 2\",\"period3\":\"Period 3\",\"period4\":\"Period 4\",\"period5\":\"Period 5\",\"period6\":\"Period 6\",\"period7\":\"Period 7\",\"period8\":\"Tutorial\",\"period9\":\"SELF/Gunn Together\",\"break\":\"Lunch\"}",
//       "lastUpdated": "1618863485050"
//   },
//   "classes": {
//       "period1": {
//           "value": "2772296125"
//       },
//       "period2": {
//           "value": "2772297879"
//       },
//       "period3": {
//           "value": "2772299958"
//       },
//       "period4": {
//           "value": "2772302878"
//       },
//       "break": {
//           "value": "None"
//       },
//       "period5": {
//           "value": "2772303225"
//       },
//       "period6": {
//           "value": "2772305559"
//       },
//       "period7": {
//           "value": "2772307416"
//       },
//       "period8": {
//           "value": "None"
//       },
//       "period9": {
//           "value": "2772321865"
//       }
//   }
// }
let done = false;
const fetchAndSet = async (setCourseInfo, setScheduleData) => {
  if (localStorage.getItem("cachedSchedule")) setScheduleData(JSON.parse(localStorage.getItem("cachedSchedule")));
  if (localStorage.getItem("cachedCourseInfo")) setCourseInfo(JSON.parse(localStorage.getItem("cachedCourseInfo")));
  if (done) return;
  done = true;

  let [schedule, courses] = await Promise.all([axios.get("https://api.hwbounty.help/schedule/@me"), axios.get("https://api.hwbounty.help/sgy/getZoomLinks")]);
  localStorage.setItem("cachedCourseInfo", JSON.stringify(courses.data));
  localStorage.setItem("cachedSchedule", JSON.stringify(schedule.data));
  setScheduleData(schedule.data);
  setCourseInfo(courses.data);
}
export const Schedule = (props) => {
  const [courseInfo, setCourseInfo] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  if (!scheduleData || !courseInfo) {
    fetchAndSet(setCourseInfo, setScheduleData);
    return null;
  }
  const periods = parsePeriods(scheduleData, courseInfo);
  console.log(periods);
  // [
  //   {
  //     period: 1,
  //     name: "GeoH",
  //     color: "rgb(255,149,128)",
  //     zoom: [
  //       { link: "https://example.com", title: "Office hours" },
  //       { link: "https://google.com", title: "GeoH 1st period Zoom Link" },
  //     ],
  //   },
  //   {
  //     period: 2,
  //     name: "Bio",
  //     color: "rgb(255,204,153)",
  //     zoom: [
  //       { link: "https://example.com", title: "Office hours" },
  //       { link: "https://google.com", title: "GeoH 1st period Zoom Link" },
  //     ],
  //   },
  //   {
  //     period: 3,
  //     name: "Spanish",
  //     color: "rgb(255,255,153)",
  //     zoom: [
  //       { link: "https://example.com", title: "Office hours" },
  //       { link: "https://google.com", title: "GeoH 1st period Zoom Link" },
  //     ],
  //   },
  //   {
  //     period: 4,
  //     name: "Business",
  //     color: "rgb(204,255,153)",
  //     zoom: [
  //       { link: "https://example.com", title: "Office hours" },
  //       { link: "https://google.com", title: "GeoH 1st period Zoom Link" },
  //     ],
  //   },
  //   {
  //     period: 5,
  //     name: "English",
  //     color: "rgb(204,247,255)",
  //     zoom: [
  //       { link: "https://example.com", title: "Office hours" },
  //       { link: "https://google.com", title: "GeoH 1st period Zoom Link" },
  //     ],
  //   },
  //   {
  //     period: 6,
  //     name: "History",
  //     color: "rgb(204,212,255)",
  //     zoom: [
  //       { link: "https://example.com", title: "Office hours" },
  //       { link: "https://google.com", title: "GeoH 1st period Zoom Link" },
  //     ],
  //   },
  //   {
  //     period: 7,
  //     name: "PE",
  //     color: "rgb(238,204,255)",
  //     zoom: [
  //       { link: "https://example.com", title: "Office hours" },
  //       { link: "https://google.com", title: "GeoH 1st period Zoom Link" },
  //     ],
  //   },
  // ];

  return (
    <Container style={{ marginBottom: "50px", width: "100%", padding: "0px", marginBottom: "5%"}}>
      {React.Children.toArray(
        periods.map((p) => {
          return (
            <PeriodButton
              period={p.period}
              name={p.name}
              zoom={p.zoom}
              color={p.color}
            />
          );
        })
      )}
    </Container>
  );
};

export default Schedule;
