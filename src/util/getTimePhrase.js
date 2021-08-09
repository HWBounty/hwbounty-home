import moment from "moment-timezone";
import Notifications from "../util/notifications";
let lastTimeBasedNotif = 0;
export const getTimePhrase = () => {
	try {
		if (!localStorage.getItem("cachedSchedule")) return "";
		let scheduleOBJ = JSON.parse(localStorage.getItem("cachedSchedule"));
		let classData = JSON.parse(localStorage.getItem("cachedCourseInfo"));
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
};
export const getWhenSchoolEnds = (offset) => {
	try {
		if (!localStorage.getItem("cachedSchedule")) return "";
		let scheduleOBJ = JSON.parse(localStorage.getItem("cachedSchedule"));
		let classData = JSON.parse(localStorage.getItem("cachedCourseInfo"));
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
		let scheduleDay = moment(Date.now());
		let ogHasOffset = !!offset;
		if (offset)
			offset = ((scheduleDay.isoWeekday() - 1) + (offset % 7 + 7) % 7) % 7;
		else
			offset = (scheduleDay.isoWeekday() - 1);
		let dotw = [
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
			"sunday",
		][offset];
		let formattedClasses =
			schedule[dotw] &&
			schedule[dotw].map((clas) => {
				let courseInfo = classData.filter(x => x.course.id === allClasses[clas.period].value).length
					? allClasses[clas.period]
					: null;
				if (!(courseInfo) && clas.period !== "break") return null;
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
					endTime: clas.timeEnd,
				};
			}).filter(x => x);
		formattedClasses.sort((a, b) => b.timeEnd - a.timeEnd);
		if (!formattedClasses.length) return "No school today!";
		return ``
	} catch (er) {
		console.trace(er);
	}
};
export default getTimePhrase;