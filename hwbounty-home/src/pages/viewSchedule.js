import { Card, Container, Grid, InputBase, List, MuiThemeProvider, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
class Schedule extends Component {
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
		// eslint-disable-next-line no-restricted-globals
		let res = await axios.get(`https://api.hwbounty.help/schedules/view/${location.href.split("?id=").pop()}`);
		if (res.data) {
			res.data.nameOverrides = JSON.parse(res.data.nameOverrides.replace(/\\"/g, "\""));
			res.data.schedule = JSON.parse(res.data.schedule.replace(/\\"/g, "\""));
			this.setState({ scheduleData: (res.data) });
		}

		console.log(this.state);
	}
	componentDidMount(props) {
		this.props = props;
	}
	handleTabChange(event, newValue,self) {
		self.setState({ tab: newValue });
	};
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
				<Paper>
					<Tabs
						value={this.state.tab}
						indicatorColor="primary"
						textColor="primary"
						onChange={(event,value)=>{this.handleTabChange(event,value,this)}}
						variant="fullWidth"
					>
						<Tab label="Mon" />
						<Tab label="Tue" />
						<Tab label="Wed" />
						<Tab label="Thu" />
						<Tab label="Fri" />
						<Tab label="Sat" />
						<Tab label="Sun" />
					</Tabs>
					<List>
						{this.state.tab === 0 && <DisplayedScheduleDay day={this.state.tab} data={this.state.scheduleData}/>}
						{this.state.tab === 1 && <DisplayedScheduleDay day={this.state.tab} data={this.state.scheduleData}/>}
						{this.state.tab === 2 && <DisplayedScheduleDay day={this.state.tab} data={this.state.scheduleData}/>}
						{this.state.tab === 3 && <DisplayedScheduleDay day={this.state.tab} data={this.state.scheduleData}/>}
						{this.state.tab === 4 && <DisplayedScheduleDay day={this.state.tab} data={this.state.scheduleData}/>}
						{this.state.tab === 5 && <DisplayedScheduleDay day={this.state.tab} data={this.state.scheduleData}/>}
						{this.state.tab === 6 && <DisplayedScheduleDay day={this.state.tab} data={this.state.scheduleData}/>}
					</List>
				</Paper>
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
const DisplayedScheduleDay = (props)=>{
	const classes = props.classes;
	const data = props.data;
	const day = props.day;
	
	let dayschedule = data.schedule[["monday","tuesday","wednesday","thursday","friday","saturday","sunday"][day]];
	console.log(dayschedule);
	return (
		<Container>
			<Typography variant="h1">{day}</Typography>
			
		</Container>
	)
}
export default connect()(Schedule);