import { Avatar, Button, Card, Container, FormControl, Grid, InputBase, InputLabel, List, MenuItem, MuiThemeProvider, Paper, Select, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import ReactMarkdown from "react-markdown";

class SetSchedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scheduleData: null,
			fetching: false,
			tab: 0,
		}
	}
	async fetchScheduleData() {
		console.log("FETCHING")
		if (this.state.scheduleData) return console.log(this.state.scheduleData);
		try {
			// eslint-disable-next-line no-restricted-globals
			let [res, selfData, courses] = await Promise.all([axios.get(`https://api.hwbounty.help/schedules/view/${location.href.split("?id=").pop()}`).catch(er => console.log), axios.get(`https://api.hwbounty.help/@me`).catch(console.trace), axios(`https://api.hwbounty.help/sgy/getCourses`).catch(console.trace)]);
			if (res.data) {
				res.data.nameOverrides = JSON.parse(res.data.nameOverrides);
				res.data.schedule = JSON.parse(res.data.schedule);
				let assign = {
					scheduleData: res.data,
				}
				if (selfData.data) assign.self = selfData.data;
				if (courses.data) assign.courses = courses.data.section;
				this.setState(assign);
			}
		} catch (error) {
			console.trace(error);
			this.setState({});
		}


		console.log(this.state);
	}
	componentDidMount(props) {
		this.props = props;
	}
	parseAllPeriods(schedule) {
		let periods = new Set();
		["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].forEach(x => {
			schedule[x].forEach(y => {
				periods.add(y.period);
			})
		})
		return Array.from(periods.keys());
	}
	async handleSet(self) {
		if (self.state.setting) return;
		self.setState({setting: true});
		let periodChoices = self.state.periodChoices;
		// eslint-disable-next-line no-restricted-globals
		let schedule = location.href.split("?id=").pop();
		console.log({
			scheduleID: schedule,
			classes: periodChoices
		});
		let res = await axios.post(`https://api.hwbounty.help/schedules/set`, {
			scheduleID: schedule,
			classes: periodChoices
		}).catch(console.trace);
		if (res.status === 200) {
			// eslint-disable-next-line no-restricted-globals
			location.href = "https://hwbounty.help";
		}else{
			self.setState({setting:false})
		}
	}
	// {
	// 	"section": [
	// 		{
	// 			"id": "2772297879",
	// 			"course_title": "APCompSci A",
	// 			"course_code": "118553",
	// 			"course_id": "2772295922",
	// 			"school_id": "1569031",
	// 			"building_id": "7924989",
	// 			"access_code": "",
	// 			"section_title": "2 Bautista (2491B 2 FY)",
	// 			"section_code": "",
	// 			"section_school_code": "582999",
	// 			"synced": "0",
	// 			"active": 1,
	// 			"description": "",
	// 			"subject_area": "0",
	// 			"grade_level_range_start": 0,
	// 			"grade_level_range_end": 0,
	// 			"parent_id": "0",
	// 			"grading_periods": [
	// 				807401,
	// 				807414
	// 			],
	// 			"profile_url": "https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/courselogos/logo-2772295929_5f7388111c9eb.jpg?1601407694",
	// 			"location": "",
	// 			"meeting_days": [
	// 				""
	// 			],
	// 			"start_time": "",
	// 			"end_time": "",
	// 			"weight": "0",
	// 			"options": {
	// 				"weighted_grading_categories": "1",
	// 				"upload_documents": "0",
	// 				"create_discussion": "0",
	// 				"member_post": "1",
	// 				"member_post_comment": "1",
	// 				"default_grading_scale_id": 0,
	// 				"content_index_visibility": {
	// 					"topics": 0,
	// 					"assignments": 0,
	// 					"assessments": 0,
	// 					"course_assessment": 0,
	// 					"common_assessments": 0,
	// 					"documents": 0,
	// 					"discussion": 0,
	// 					"album": 0,
	// 					"pages": 0
	// 				},
	// 				"hide_overall_grade": 1,
	// 				"hide_grading_period_grade": 1,
	// 				"allow_custom_overall_grade": 0,
	// 				"allow_custom_overall_grade_text": 0
	// 			},
	// 			"admin": 0,
	// 			"links": {
	// 				"self": "https://api.schoology.com/v1/sections/2772297879"
	// 			}
	// 		},
	// 	],
	// 	"links": {
	// 		"self": "https://api.schoology.com/v1/users/23680034/sections"
	// 	}
	// }
	handleDropdowns(self) {
		let courses = self.state.courses;
		let periods = this.parseAllPeriods(self.state.scheduleData.schedule);
		let options = courses.map(x => {
			return { id: x.id, name: x.course_title };
		}).concat({ id: "None", name: "None" });
		let nameOverrides = self.state.scheduleData.nameOverrides;
		console.log(periods);
		const handleChange = (event, data) => {
			let obj = self.state.periodChoices || {};
			obj[data] = event.target;
			self.setState({ periodChoices: obj });
		}
		return periods.map(x => {

			return (
				<FormControl
					style={{
						width: "30%",
						minWidth: "30%",
						margin: "1.5%",
					}}
					required>
					<InputLabel id={`inputLabel${x}`}>{nameOverrides[x] || x}</InputLabel>
					<Select
						labelId={`select${x}Label`}
						id={`select${x}`}
						value={self.state.periodChoices && self.state.periodChoices[`${x}`]}
						onChange={event => { handleChange(event, `${x}`) }}
					>
						{React.Children.toArray(options.map(option => {
							return (
								<MenuItem value={option.id}>{option.name}</MenuItem>
							)
						}))}
					</Select>
				</FormControl>
			);
		});

		// self.state
	}
	render() {
		if (!this.state.scheduleData && !this.state.fetching) {
			console.log("GoFetch");
			this.setState({ fetching: true });
			this.fetchScheduleData();
			return (<br />);
		}
		//Infinite Loop setstate somewhere; Figure out what
		if (this.state.scheduleData) {
			// this.setState({ fetching: false })
			return (
				<Container>
					<Card style={{
						display: "inline-block",
						width: "90%",
						margin: "5%",
						paddingBottom: "1vh",
						paddingLeft: "5%",
						paddingRight: "5%",
						textAlign: "left",
						verticalAlign: "middle",
					}}>
						{/* <Typography variant="h4">Stats</Typography> */}
						<Typography variant="h4" style={{
							textAlign: "center"
						}}>{this.state.scheduleData.name}</Typography>
						<Container style={{
							width: "100%",
							height: "10%",
						}}>
							<span>
								<Typography variant="caption" style={{
									textAlign: "left",
									marginRight: "1%"
								}}>
									By:
								</Typography>
								<Avatar src={this.state.scheduleData.user.pfp} align="left" style={{
									display: "inline-block",
									verticalAlign: "middle",
								}}>
									{this.state.scheduleData.user.publicID}
								</Avatar>
								<Typography variant="h5" style={{
									verticalAlign: "middle",
									marginLeft: "1%",
									display: "inline-block",
									// fontSize: "47px",
									// height: "40px",
								}}>
									{this.state.scheduleData.user.publicID}
								</Typography>

							</span>

						</Container>
						<Typography>
							Last Updated: {moment(parseInt(this.state.scheduleData.lastUpdated)).fromNow()}
						</Typography>
						<ReactMarkdown>{this.state.scheduleData.description}</ReactMarkdown>
						<Container
							style={
								{
									width: "100%"
								}
							}>
							{React.Children.toArray(this.handleDropdowns(this))}
						</Container>
						<Container style={{
							paddingTop: "1vh",
							borderTop: "2px solid rgba(160, 160, 160, 0.2)",
							textAlign: "center",
						}}>
							<Button onClick={ev=>this.handleSet(this)}>Set Classes</Button>
						</Container>

					</Card>
				</Container>

			)
			// return (
			// 	<Paper >
			// 		<Tabs
			// 			value={this.state.tab}
			// 			indicatorColor="primary"
			// 			textColor="primary"
			// 			onChange={this.handleTabChange}
			// 			variant="fullWidth"
			// 		>
			// 			<Tab label="Schedule" />
			// 			<Tab label="Assignments" />
			// 			<Tab label="Zoom Links" />
			// 		</Tabs>
			// 		<List>
			// 			{this.state.tab === 0 && <Schedule />}
			// 			{/* {this.state.tab === 1 && <Assignments />}
			// 			{this.state.tab === 2 && <ZoomLinks />} */}
			// 		</List>
			// 	</Paper>
			// )
		}
		return null;
	}
}
const DisplayedScheduleDay = (props) => {
	const classes = props.classes;
	const data = props.data;
	const day = props.day;
	let overrides = data.nameOverrides;
	//{period: "period1", timeStart: "10:00am", timeEnd: "10:30am"}
	let dayschedule = data.schedule[["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"][day]].map(x => {
		return Object.assign(x, {
			period: data.nameOverrides[x.period] || x.period,
		})
	});
	console.log(dayschedule);
	const renderPeriods = () => {
		let children = React.Children.toArray(dayschedule.map(x => {
			return (
				<Container >
					<Typography variant="h4">{x.period}</Typography>
					<Typography variant="h6">{x.timeStart}</Typography>
					<Typography variant="h6">{x.timeEnd}</Typography>
				</Container>
			)
		}));
		if (!children.length)
			return (<Typography variant="h3">No School Today!</Typography>);
		return children;
	}
	return (
		<Container style={{
			marginBottom: "5%",

		}}>
			{/* <Typography variant="h1">{day}</Typography> */}
			{renderPeriods()}
		</Container>
	)
}
export default connect()(SetSchedule);