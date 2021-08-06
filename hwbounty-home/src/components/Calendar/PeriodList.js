import { makeStyles, Card, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import moment from "moment";
import React from "react";
const useStyles = makeStyles(theme => ({
	cardTitle: {
		fontFamily: "Raleway",
		fontSize: "2.5rem",
	},
	cardSubtitles1: {
		fontFamily: "Raleway",
		fontSize: "1.25rem",
		fontWeight: "200",
	},
	card: {
		boxShadow:
			"0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)!important",
	}
}));
const generatePeriodColors = (stops, theme) => {
	let retarr = [];
	for (let index = 0; index < stops; index++)
		//50 => 25, 70 => 30 for Dark mode

		retarr.push([0 + (index / stops) * 360, 0, theme ? 30 : 70]);
	return retarr;
};
const parsePeriods = (scheduleData, zoomLinkInfo, theme, offset) => {
	let scheduleDay = moment(Date.now());
	let ogHasOffset = offset;
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
	return today.map((x, i) => {
		let courseInfo = classes.has(
			allClasses[x.period] && allClasses[x.period].value
		)
			? classes.get(allClasses[x.period] && allClasses[x.period].value)
			: null;
		// if (!(courseInfo) && x.period !== "break") return null;
		return {
			period: nameOverrides[x.period] || x.period,
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
	}).filter(x => x);
};
const PeriodList = (props) => {
	const classes = useStyles(props.UI.theme);
	const periodData = parsePeriods(props.scheduleData, props.zoomLinkInfo, props.UI.theme, props.offset);
	let periodMapped = periodData.map((periodData) => {
		return (
			<PeriodButton color={"rgb(40,40,40)"} name={periodData.name} UI={props.UI} startTime={periodData.tSS} endTime={periodData.tES} duration={`${Math.round((periodData.timeEnd - periodData.timeStart) / (1000 * 60))} minutes`}>
			</PeriodButton>
		);
	})

	return (<div >
		{React.Children.toArray(periodMapped)}
	</div>)
}
const cardWidth = "40rem";
const cardHeight = "9rem";
const PeriodButton = (props) => {
	const classes = useStyles(props.UI.theme);
	return (
		<Card style={{
			borderRadius: "0.5rem",
			backgroundColor: props.color,
			width: `clamp(${cardWidth},${cardWidth},${cardWidth})`,
			height: `clamp(${cardHeight},${cardHeight},${cardHeight})`,
			display: "flex",
			padding: "1.5rem",
			flexDirection: "column",
			alignItems: "flex-start",
			margin: "2rem"
		}} className={`${classes.card}`}>
			<Typography className={`${classes.cardTitle}`}>{props.name}</Typography>
			<Typography className={`${classes.cardSubtitles1}`}>{`${props.startTime} - ${props.endTime} (${props.duration})`}</Typography>
		</Card>
	)
};
const mapStateToProps = (state) => ({
	UI: state.UI
})

export default connect(mapStateToProps)(PeriodList);