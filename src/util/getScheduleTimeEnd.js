import moment from "moment";

export const getScheduleTimeEnd = (offset) => {
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
    ][(moment().isoWeekday() - 1 + (offset || 0)) % 7];
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
    let currentClass = formattedClasses.sort(
      (a, b) => b.timeStart - a.timeStart
    )[0];
    if (!currentClass)
      return null;
    else
      return (<div>Class ends at <b>{moment(currentClass.timeEnd).format("h:mm a")}</b> today.</div>);
    //If no classes exist for the day
  } catch (error) {
    console.trace(error)
    return "";
  }
}
export default getScheduleTimeEnd;