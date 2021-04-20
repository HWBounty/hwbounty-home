import { Card, Container, Grid, InputBase, MuiThemeProvider, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useRoundInputBaseStyles } from "@mui-treasury/styles/inputBase/round";
import theme from "../util/theme";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
let semiGlobalState = null;
const SchedulesSearch = (props) => {
	const [query, setQuery] = useState("");
	const roundInput = useRoundInputBaseStyles();

	const handleSubmit = (event) => {
		event.preventDefault();

		const url = "https://forums.hwbounty.help/?" + query;
		const newWindow = window.open(url, "_blank", "noopener,noreferrer");
		if (newWindow) newWindow.opener = null;
	};

	const handleChange = (event) => {
		setQuery(event.target.value);
		//Sync the fields
		setTimeout(() => props.handleTextChange(event), 0);
	};

	return (
		<Container maxWidth="xs">
			<MuiThemeProvider theme={theme}>
				<form onSubmit={handleSubmit}>
					<InputBase
						classes={roundInput}
						laceholder="Search Schedules..."
						onChange={handleChange}
						value={query}
						fullWidth
						{...props}
					/>
				</form>
			</MuiThemeProvider>
		</Container>
	);
};
const SchedulePreview = (props) => {
	return (
		<Card style={
			{
				"display": "inline-block",
				"vertical-align": "top",
				"width": "350px",
				"position": "relative",
				"overflow": "hidden",
				"margin": "10px",
				"background": "#FFF",
				"box-shadow": "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)",
				"color": "#272727",
				"border-radius": "8px",
			}
		}>
			<Typography variant="h5" align="left" style={
				{
					"line-height": "48px",
					"font-size": "24px",
					"font-weight": "300",
					// position: "absolute",
					padding: "20px",
					// color: "#FFF",
				}
			}>{props.name}</Typography>
			<Typography align="left" style={
				{
					"padding": "20px",
					"font-weight": "300",
					"border-radius": "0 0 2px 2px",
				}
			}><ReactMarkdown>{props.desc.substring(0,100)}</ReactMarkdown></Typography>
			<Container style={
				{
					"border-top": "2px solid rgba(160, 160, 160, 0.2)",
					"padding-top": "10%",

				}
			}>
				<Link style={
					{
						"color": "#1976D2",
						"transition": "color 0.3s ease",
						"text-transform": "uppercase",
						"text-decoration": "none",
						"font-size": "16px",
					}
					//href no worky
				// eslint-disable-next-line no-restricted-globals
				} onClick={()=>{location.href = `https://hwbounty.help/schedule/view?id=${props.sid}`}}>View Schedule
				</Link>
				
			</Container>
		</Card >
	)
}
class ScheduleCatalog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: "",
			schedules: [],
		};
		semiGlobalState = this.state;
	}
	async handleTextChange(event, self) {
		self.setState({ searchTerm: event.target.value });
		let time = Date.now();
		let res = await axios.get(`https://api.hwbounty.help/schedules/search/${self.state.searchTerm}`);
		self.setState({ schedules: res.data })
		console.log(res.data, Date.now() - time);
		console.log(self.state);
	}
	render() {
		return (
			<Container>
				<Typography variant="h3" style={
					{
						padding: "10px"
					}
				}>Schedules Catalog</Typography>
				<SchedulesSearch handleTextChange={ev => this.handleTextChange(ev, this)} />
				<Grid container>
					{React.Children.toArray(this.state.schedules.map(x => {
						return (
							<SchedulePreview name={x.name} desc={x.description} sid={x.id}></SchedulePreview>
						)
					}))}
				</Grid>
			</Container>
		)
	}
}
export default connect()(ScheduleCatalog);