// React
import React, { Component, useEffect } from "react";

// MUI
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import makeStyles from "@material-ui/core/styles/makeStyles";
import moment from "moment-timezone";
import { useState } from "react";
import axios from "axios";
import { CircularProgress, Container, Divider } from "@material-ui/core";
import { useSnackbar } from "notistack";
// Redux
import { connect } from "react-redux";
import { linkUserSchoology } from "../../redux/actions/userActions";
import { CTime2 } from "../Home/CTime";
import PeriodList from "./PeriodList";
import TetLib from "../../util/TetLib";
import useForceUpdate from "../../util/useForceUpdate";
import { render } from "react-dom";
const decodeHTML = (string) => {
	const map = { gt: ">" /* , … */ };
	return string.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, ($0, $1) => {
		if ($1[0] === "#") {
			return String.fromCharCode(
				$1[1].toLowerCase() === "x"
					? parseInt($1.substr(2), 16)
					: parseInt($1.substr(1), 10)
			);
		} else {
			return map.hasOwnProperty($1) ? map[$1] : $0;
		}
	});
};
const useButtonStyles = makeStyles({
	root: {
		border: 0,
		borderRadius: "1rem!important",
		marginTop: "2vw",
		paddingBottom: 10,
		display: "block",
		cursor: "pointer",
		position: "relative",
		boxShadow: " 4px 6px 5px 4px rgba(0,0,0,0.2)!important",
	},
});
const useStyles = makeStyles(theme => ({
	fullHeight: {
		height: "100%",
		minHeight: "100%",
		maxHeight: "100%",

	},
	card: {
		boxShadow: theme => theme === 1 ?
			"0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)!important" :
			"0 3px 6px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.01)!important",
		background: (theme) => (theme === 1 ? "rgb(40,40,40)" : "rgb(250,250,250)"),
		borderRadius: "1vmin",
	}
}));
const SchedulePage = (props) => {
	const {
		UI: { theme },
		schedule
	} = props;
	const forceUpdate = useForceUpdate();
	const [user, setUser] = useState(null);
	const { sleep } = TetLib
	useEffect(() => {
		let run = true;
		(async () => {
			await sleep(250 - (Date.now() % 250));
			let lastTime = Date.now();
			while (run) {
				await sleep(250 - (Date.now() % 250));
				forceUpdate();
				lastTime = Date.now();
			}
		})();
		return () => {
			run = false;
		};
	}, []);
	const renderMain = () => {
		if (!document.getElementById("divSize")) {
			setTimeout(() => forceUpdate(), 1);
			return null;
		}

		return (<div style={{
			// width: "clamp(0vw, 30%, 50vw)",
			flexGrow: "1",
			marginTop: "2rem",
			marginLeft: "5rem",
			position: "fixed",
			marginRight: "5rem",
		}}
			className={`${classes.fullHeight}`}
		>
			<Card
				className={classes.card}
				style={{
					margin: "0 auto",
					maxHeight: "95%",
					minHeight: "95%",
					padding: "1rem",
					width: `calc(${document.getElementById("divSize").offsetWidth}px - 6rem)`,
				}}
			>
				<CTime2 />
				<br />
				<Divider />
			</Card>
		</div>)
	};
	const classes = useStyles(theme);
	if (!schedule) return null;
	return (<div style={{
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		maxwidth: "calc(100vw - 5rem)",
		position: "relative",
	}} className={`${classes.fullHeight}`}>
		<div style={{ flexGrow: "1" }} id="divSize">
			{renderMain()}
		</div>
		<Container style={{ display: "flex", /*backgroundColor: "black",*/ justifyContent: "center", width: "33vw" }} className={`${classes.fullHeight}`}>
			<PeriodList scheduleData={schedule} zoomLinkInfo={[]} offset={4} />
		</Container>

	</div>)
}

const mapStateToProps = (state) => ({
	UI: state.UI,
	user: state.user,
});
const mapActionsToProps = {
};
export default connect(mapStateToProps, mapActionsToProps)(SchedulePage);
