// React
import React, { useState } from "react";

// MUI
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

// MUI Treasury
// import { useRoundInputBaseStyles } from "@mui-treasury/styles/inputBase/round";

import theme from "../../util/theme";
import { Button, Container, List, ListItem, Paper, TextField, Typography } from "@material-ui/core";

import Fuse from 'fuse.js'
/*
TODO: remove mui theme provider here, it should work without it!!!
(maybe check pallete or something?, color is sent but dark mode is not)
*/
const styles = (theme) => ({
	...theme.spreadIt // textField is defined inside spreadIt
});

const pageArray = [
	{
		name: "Home",
		path: "/",
		description: "The main page with scheduling and more!"
	},
	{
		name: "Schedules",
		path: "/schedules",
		description: "Find the perfect schedule for you!"
	},

]
const fuseOptions = {
	includeScore: true,
	// Search in `author` and in `tags` array
	keys: ['name', 'description']
}
const fuse = new Fuse(pageArray, fuseOptions);
export const PageSearch = (props) => {
	const [query, setQuery] = useState("");
	// const roundInput = useRoundInputBaseStyles();

	const handleSubmit = (event) => {
		event.preventDefault();

		const url = "https://forums.hwbounty.help/?" + query;
		const newWindow = window.open(url, "_blank", "noopener,noreferrer");
		if (newWindow) newWindow.opener = null;
	};

	const handleChange = (event) => {
		setQuery(event.target.value);
	};
	const renderResults = () => {
		return React.Children.toArray(fuse.search(query).map(result => {
			return (
				<ListItem align="left" style={{
					minWidth: 396,
					margin: 0,
					padding: 0,
					textAlign: "left",
				}}>
					<Button style={{
						minWidth: 396,
						margin: 0,
						marginTop: 5,
						padding: 0,
						textAlign: "left",
						textTransform: "none",
						borderRadius: 0,
					}} align="left">
						<Typography variant="h4" style={{
							fontSize: 20,
							fontFamily: "'Work Sans', sans-serif",
							marginLeft: 0,
							marginRight: 40,
							display: "inline-block",
							position: 'absolute',
							top: 0,
							left: 10
						}} align="left">{result.item.name}</Typography>
						<Typography variant="h5" style={
							{
								fontSize: 16,
								fontFamily: "'Work Sans', sans-serif",
								textAlign: "right",
								marginLeft: 40,
								display: "block",
								position: "relative",
							}
						}>{result.item.description}</Typography>
					</Button>

				</ListItem>)
		}))
	}
	return (
		<Container maxWidth="xs">
			<MuiThemeProvider theme={theme}>
				<form onSubmit={handleSubmit}>
					<TextField
						placeholder="Go To Page"
						onChange={handleChange}
						value={query}
						fullWidth
						{...props}
					/>
				</form>
			</MuiThemeProvider>
			<Paper style={{
				minWidth: 396,
				height: 160,
				position: "absolute",
				top: 50,
				borderTopLeftRadius: 0,
				borderTopRightRadius: 0,
			}}>
				<List style={{
					minWidth: 396,
					height: 440,
					overflowX: "hidden",
					overflowY: "scroll",
					scrollbarWidth: "none",
					position: "absolute",
					padding: 0,
					margin: 0,
				}}>
					{renderResults()}

				</List>
			</Paper>

		</Container>
	);
};

export default withStyles(styles)(PageSearch);
