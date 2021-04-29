import { Avatar, Button, Card, Container, FormControl, Grid, InputBase, InputLabel, List, MenuItem, MuiThemeProvider, Paper, Select, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { withRouter } from "react-router";

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
			let [res, selfData, courses] = await Promise.all([axios.get(`https://api.hwbounty.help/schedules/view/${this.props.location.pathname.split("/").pop()}`).catch(er => console.log), axios.get(`https://api.hwbounty.help/@me`).catch(console.trace), axios(`https://api.hwbounty.help/sgy/getCourses`).catch(console.trace)]);
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
		let sch = this.props.location.pathname.split("/").pop();
		console.log(sch);
		let res = await axios.post(`https://api.hwbounty.help/schedules/set`, {
			scheduleID: sch,
			classes: periodChoices
		}).catch(console.trace);
		if (res.status === 200) {
			// eslint-disable-next-line no-restricted-globals
			location.href = "https://hwbounty.help";
		}else{
			self.setState({setting:false})
		}
	}
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
		}
		return null;
	}
}
const DisplayedScheduleDay = (props) => {
	const classes = props.classes;
	const data = props.data;
	const day = props.day;
	let overrides = data.nameOverrides;
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
			{renderPeriods()}
		</Container>
	)
}
export default connect()(withRouter(SetSchedule));