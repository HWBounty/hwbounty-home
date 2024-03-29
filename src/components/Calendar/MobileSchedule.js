import { Component, useEffect, useState } from 'react';

import { Button, Card, IconButton, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import moment from 'moment';

import { connect } from 'react-redux';

import { withSnackbar } from 'notistack';

import Schedule from './Schedule';
import Notifications from '../../util/notifications';
import { getWhenSchoolEnds } from '../../util/getTimePhrase';
import { getTimePhrase } from '../../util/getScheduleTimePhrase';
import { getScheduleTimeEnd } from '../../util/getScheduleTimeEnd';
import TetLib from '../../util/TetLib';
import useForceUpdate from '../../util/useForceUpdate';

let lastTimeBasedNotif = 0;
const MobileSchedulePage = (props) => {
  const forceUpdate = useForceUpdate();
  const [offset, setOffset] = useState(0);
  const [popupForceClosed, setPopupForceClosed] = useState(false);
  const goBackADay = () => {
    setOffset(offset - 1);
  };
  const fastForwardADay = () => {
    setOffset(offset + 1);
  };
  let adjustedMoment = moment().add(offset * 24, 'hours');
  useEffect(() => {
    let run = true;
    (async () => {
      await TetLib.sleep(1000 - (Date.now() % 1000));
      while (run) {
        await TetLib.sleep(1000);
        forceUpdate();
      }
    })();
    return () => {
      run = false;
    };
  }, []);
  return (
    <div
      style={{
        marginTop: '5%',
      }}
    >
      <Card
        style={{
          padding: '2%',
          paddingBottom: '0%',
          margin: '5%',
          /* max-height: 50vw!important; */
          /* height: 50vw; */
          width: '90%',

          borderRadius: 5,
          borderWidth: 0,
          background: 'rgba(0,0,0,0)',
        }}
      >
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <IconButton onClick={goBackADay}>
              {' '}
              <ChevronLeft />{' '}
            </IconButton>{' '}
            <Typography
              style={{
                fontFamily: 'Poppins',
                fontWeight: '400',
                fontSize: '24px',
              }}
            >
              {adjustedMoment.format('MM/DD/YYYY')}
            </Typography>
            <IconButton onClick={fastForwardADay}>
              {' '}
              <ChevronRight />{' '}
            </IconButton>
          </span>
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
                fontSize: "5.65vw",
                fontFamily: "Nunito",
                fontWeight: "600",
              }}
            >
              {
          /*moment().format(window.innerWidth <= 1368 ? "M/D/YYYY h:mm:ss A" : "dddd MMMM Do h:mm:ss A")*/ adjustedMoment.format(
                "dddd"
              )
              }
            </Typography>
          </div>
          <Typography
            variant="h5"
            style={{
              fontSize: 24,
              fontFamily: "Nunito",
            }}
          >
            {offset == 0 && getTimePhrase(offset)}
          </Typography>
          <br />
          <br />
          <Typography
            variant="h5"
            style={{
              fontSize: 16,
              fontFamily: "Nunito",
              textAlign: "left",
            }}
          >
            {getScheduleTimeEnd(offset)}
          </Typography>
          <Snackbar
            open={offset !== 0 && !popupForceClosed}
          >
            <Alert severity={"info"} onClose={(e, reason) => reason !== "clickaway" && setPopupForceClosed(true)}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {offset !== 0 && `Now viewing the schedule ${offset < 0 && "from" || ""} ${adjustedMoment.fromNow()}.`}
                <Button color="primary" size="small" onClick={(e, reason) => reason !== "clickaway" && setOffset(0)} style={{ paddingTop: "0", paddingBottom: "0" }}>
                  Take me back
                </Button>
              </div>
            </Alert>
          </Snackbar>
        </div>
        <Schedule dayOffset={offset} />
      </Card>
    </div >
  );
};
// class ScheduleInfo extends Component {
//   constructor(p) {
//     super(p);
//     setTimeout(
//       () => setInterval(() => this.forceUpdate(), 1000),
//       1000 - (Date.now() % 1000)
//     );
//     this.state = {
//       offset: 0,
//     };
//   }
//   goBackADay(salf) {
//     salf.setState({ offset: salf.state.offset - 1 });
//   }
//   fastForwardADay(salf) {
//     salf.setState({ offset: salf.state.offset + 1 });
//   }
//   getTimePhrase() {
//     try {
//       if (!localStorage.getItem("cachedSchedule")) return "";
//       let scheduleOBJ = JSON.parse(localStorage.getItem("cachedSchedule"));
//       let schedule = JSON.parse(scheduleOBJ.schedule.schedule);
//       let user = JSON.parse(localStorage.getItem("user"));
//       let allClasses = scheduleOBJ.classes;
//       let convertedMoment = moment().tz(schedule.timePeriod).utcOffset();
//       let currentMoment = moment().utcOffset();
//       let currentTime = moment();
//       let getPeriodName = (periodID) => {
//         return (
//           JSON.parse(scheduleOBJ.schedule.nameOverrides)[periodID] || "Break"
//         );
//       };
//       let dotw = [
//         "monday",
//         "tuesday",
//         "wednesday",
//         "thursday",
//         "friday",
//         "saturday",
//         "sunday",
//       ][moment().isoWeekday() - 1];
//       let formattedClasses =
//         schedule[dotw] &&
//         schedule[dotw].map((clas) => {
//           return {
//             period: clas.period,
//             timeStart:
//               moment(clas.timeStart, "hh:mma")
//                 .add((convertedMoment - currentMoment) / 60, "hours")
//                 .unix() * 1000,
//             timeEnd:
//               moment(clas.timeEnd, "hh:mma")
//                 .add((convertedMoment - currentMoment) / 60, "hours")
//                 .unix() * 1000,
//           };
//         });
//       //Check for current class first
//       let currentClass = formattedClasses.filter(
//         (x) => x.timeStart < Date.now() && Date.now() < x.timeEnd
//       )[0];

//       if (currentClass) {
//         let endingInString = `${currentClass.timeEnd - Date.now() > 60000
//           ? currentClass.timeEnd - Date.now() > 3600000
//             ? `${Math.round(
//               moment.duration(currentClass.timeEnd - Date.now()).asHours()
//             )} hours`
//             : `${Math.round(
//               moment.duration(currentClass.timeEnd - Date.now()).asMinutes()
//             )} minutes`
//           : `${Math.round(
//             moment.duration(currentClass.timeEnd - Date.now()).asSeconds()
//           )} seconds`
//           }`;

//         //Try to push a notif if class is starting soon
//         if (
//           currentClass.timeEnd - Date.now() < 120 * 1000 &&
//           Date.now() - lastTimeBasedNotif > 240 * 1000
//         ) {
//           lastTimeBasedNotif = Date.now();

//           Notifications.pushNotification(
//             undefined,
//             undefined,
//             `${getPeriodName(currentClass.period)} is ending soon!`,
//             `Hey ${user.firstName}, ${getPeriodName(
//               currentClass.period
//             )} is about to end in ${endingInString}!`
//           );
//         }

//         return `${getPeriodName(
//           currentClass.period
//         )} ends in ${endingInString}`;
//       }
//       //Check for next upcoming class
//       let nextClass = formattedClasses.filter(
//         (x) => x.timeStart > Date.now()
//       )[0];

//       if (nextClass) {
//         let startingInString = `${nextClass.timeStart - Date.now() > 60000
//           ? nextClass.timeStart - Date.now() > 3600000
//             ? `${Math.round(
//               moment.duration(nextClass.timeStart - Date.now()).asHours()
//             )} hours`
//             : `${Math.round(
//               moment.duration(nextClass.timeStart - Date.now()).asMinutes()
//             )} minutes`
//           : `${Math.round(
//             moment.duration(nextClass.timeStart - Date.now()).asSeconds()
//           )} seconds`
//           }`;
//         if (
//           nextClass.timeStart - Date.now() < 120 * 1000 &&
//           Date.now() - lastTimeBasedNotif > 240 * 1000
//         ) {
//           lastTimeBasedNotif = Date.now();

//           Notifications.pushNotification(
//             undefined,
//             undefined,
//             `${getPeriodName(nextClass.period)} is starting soon!`,
//             `Hey ${user.firstName}, ${getPeriodName(
//               nextClass.period
//             )} is about to start in ${startingInString}!`
//           );
//         }

//         return `${getPeriodName(
//           nextClass.period
//         )} starts in ${startingInString}`;
//       }

//       //Check for what was the previous class
//       let lastClass = formattedClasses
//         .filter((x) => Date.now() > x.timeEnd)
//         .pop();
//       if (lastClass) {
//         let lastEnded = `${Date.now() - lastClass.timeEnd > 60000
//           ? Date.now() - lastClass.timeEnd > 60000
//             ? `${Math.round(
//               moment.duration(Date.now() - lastClass.timeEnd).asHours()
//             )} hours`
//             : `${Math.round(
//               moment.duration(Date.now() - lastClass.timeEnd).asMinutes()
//             )} minutes`
//           : `${Math.round(
//             moment.duration(Date.now() - lastClass.timeEnd).asSeconds()
//           )} seconds`
//           }`;
//         return `${getPeriodName(lastClass.period)} ended ${lastEnded} ago`;
//       }

//       //If no classes exist for the day
//       return `No classes today! Take a break, you deserve it :)`;
//     } catch (error) {
//       return "";
//     }
//   }
//   render() {
//     let offset = this.state.offset;
//     let adjustedMoment = moment().add(offset * 24, "hours");
//     if (window.innerWidth <= 1000) {
//       return (
//         <div
//           style={{
//             marginTop: "5%",
//           }}
//         >
//           <Card
//             style={{
//               padding: "2%",
//               paddingBottom: "0%",
//               margin: "5%",
//               /* max-height: 50vw!important; */
//               /* height: 50vw; */
//               width: "90%",

//               borderRadius: 5,
//               borderWidth: 0,
//               background: "rgba(0,0,0,0)",
//             }}
//           >
//             <div>
//               <span
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                 }}
//               >
//                 <IconButton onClick={(x) => this.goBackADay(this)}>
//                   {" "}
//                   <ChevronLeft />{" "}
//                 </IconButton>{" "}
//                 <Typography
//                   style={{
//                     fontFamily: "Poppins",
//                     fontWeight: "400",
//                     fontSize: "24px",
//                   }}
//                 >
//                   {adjustedMoment.format("MM/DD/YYYY")}
//                 </Typography>
//                 <IconButton onClick={(x) => this.fastForwardADay(this)}>
//                   {" "}
//                   <ChevronRight />{" "}
//                 </IconButton>
//               </span>
//               <CTimeSmall />
//               <Typography
//                 variant="h5"
//                 style={{
//                   fontSize: 32,
//                   fontFamily: "Nunito",
//                 }}
//               >
//                 {this.getTimePhrase()}
//               </Typography>
//             </div>
//             <Schedule dayOffset={offset} />
//           </Card>
//         </div>
//       );
//     }
//     return (
//       <div
//         style={{
//           marginTop: "5%",
//         }}
//       >
//         <Card
//           style={{
//             padding: "2%",
//             paddingBottom: "0%",
//             /* max-height: 50vw!important; */
//             /* height: 50vw; */
//             width: "60%",
//             maxWidth: "60%",
//             display: "inline-block",
//             background: "rgba(0,0,0,0)",
//             borderRadius: 10,
//             borderWidth: 0,
//           }}
//         >
//           <div
//             style={{
//               textAlign: "left",
//             }}
//           >
//             <span
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//               }}
//             >
//               <IconButton onClick={(x) => this.goBackADay(this)}>
//                 {" "}
//                 <ChevronLeft />{" "}
//               </IconButton>{" "}
//               <Typography
//                 style={{
//                   fontFamily: "Poppins",
//                   fontWeight: "400",
//                   fontSize: "32px",
//                 }}
//               >
//                 {adjustedMoment.format("dddd MMMM D")}
//               </Typography>
//               <IconButton onClick={(x) => this.fastForwardADay(this)}>
//                 {" "}
//                 <ChevronRight />{" "}
//               </IconButton>
//             </span>
//           </div>
//           <Schedule dayOffset={offset} />
//         </Card>
//         <Card
//           style={{
//             display: "inline-block",
//             verticalAlign: "top",
//             width: "30vw",
//             height: "30vw",
//             marginLeft: "2vw",
//             padding: "2%",
//             position: "relative",
//             background: "rgba(0,0,0,0)",
//             borderRadius: "1rem!important",
//             boxShadow: "none",
//           }}
//         />
//         <Card
//           style={{
//             display: "inline-flex",
//             verticalAlign: "top",
//             width: "30vw",
//             height: "30vw",
//             marginLeft: "2vw",
//             padding: "2%",
//             position: "fixed",
//             right: "5%",
//             borderRadius: "0.5rem",
//             boxShadow: "4px 6px 5px 4px rgba(0,0,0,0.6)",
//           }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%,-50%)",
//             }}
//           >
//             <CTime />
//             <Typography
//               variant="h5"
//               align="left"
//               style={{
//                 fontSize: "2vw",
//               }}
//             >
//               {this.getTimePhrase()}
//             </Typography>
//           </div>
//         </Card>
//       </div>
//     );
//   }
// }
export default connect()(withSnackbar(MobileSchedulePage));
