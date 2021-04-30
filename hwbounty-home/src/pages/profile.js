import { Avatar, Card, Chip, makeStyles, withStyles } from "@material-ui/core";
import { useState } from "react"
import theme from "../util/theme";
import {
	Button,
	Container,
	List,
	ListItem,
	Paper,
	TextField,
	Typography,
} from "@material-ui/core";

import Fuse from "fuse.js";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { hwbountyAPI } from "../redux/types";
import badges from "../util/badges";
import React from "react";
import { getTheme } from "../components/Home/Navbar";
import moment from "moment";
/*
TODO: remove mui theme provider here, it should work without it!!!
(maybe check pallete or something?, color is sent but dark mode is not)
*/
const styles = (theme) => ({
	...theme.spreadIt,
});
const useStyles = makeStyles((theme) => ({
	root: {
	  display: 'flex',
	  '& > *': {
		margin: theme.spacing(1),
	  },
	},
	small: {
	  width: theme.spacing(3),
	  height: theme.spacing(3),
	},
	large: {
	  width: theme.spacing(16),
	  height: theme.spacing(16),
	},
  }));
export const Profile = (props) => {
	const [userData, setUserData] = useState(null);
	const [fetching, setFetching] = useState(false);
	const [error, setError] = useState(false)
	const history = useHistory();
	const classes = useStyles();
	const renderChips = (data) => {
		if (!data) return null;
		return (<div style={{
			width: "30vw",
			margin: "10px",
		}}>{React.Children.toArray(data.split(",").map(x => {
			return (
				<Chip label={badges[x]?.name || "Unknown Badge!"} color="primary" />
			)
		}))} </div>)
	}
	if (error) {
		// history.push()
		return null;
	}
	if (!userData && !fetching) {
		setFetching(true);
		(async () => {
			let fetchres = await axios.get(`${hwbountyAPI}/user/${history.location.pathname.split("/").pop()}`).catch(er => {
				console.trace(er);
				setError(true);

			});
			if (fetchres && fetchres.status === 200) {
				setUserData(fetchres.data);
				setFetching(false);
			}
		})();
	}

	if (userData) {
		console.log(userData);
		return (
			<Container>
				<Card>
					<Typography variant="h5" style={{
						fontFamily: "Nunito",
						fontSize: "64px",
					}}>{userData.firstName} {userData.lastName}</Typography>
					<Avatar src={userData.pfp || "https://cdn1.iconfinder.com/data/icons/materia-human/24/013_003_account_profile_circle-512.png"} className={classes.large} style={{
						display: "inline-block"
					}}/>
					<Typography variant="h5" style={{
						fontFamily: "Nunito",
					}}>@{userData.publicID}</Typography>
					<Paper style={{
						display: "inline-block",
						margin: "10",
						boxShadow: "none",
						background: getTheme()? "rgb(50,50,50)":"rgb(230,230,230)"
					}}>{renderChips(userData.tags)}</Paper>
					<Container style={{
						display: "block",

					}}>
						<Typography variant="h1">Stats</Typography>
						<div style={{
							textAlign: "left",
							marginLeft: "5vw",
							marginRight: "5vw",
						}}>
						<Typography variant="h5"><b>User ID</b> {userData.privateID}</Typography>
						<Typography variant="h5"><b>Joined on</b> {moment(parseInt(userData.createdAt)).format("dddd MMMM Do h:mm:ss A")} ( {moment(parseInt(userData.createdAt)).fromNow()} )</Typography>
						<Typography variant="h5"><b>Balance</b> {typeof userData.bal !== "undefined"? `${userData.bal} Coins`:"Hidden"}</Typography>
						</div>
					</Container>
				</Card>
			</Container>
		)
	}
	return null;

}


export default withStyles(styles)(Profile);
