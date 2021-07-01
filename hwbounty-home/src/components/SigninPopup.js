import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, DialogContentText, DialogActions, Typography, Button, TextField, makeStyles, LinearProgress } from "@material-ui/core";
import { useSnackbar, withSnackbar } from "notistack";
import axios from "axios";
import { hwbountyAPI } from "../redux/types";
import { setAuthorizationHeader } from "../redux/actions/userActions";
const useStyles = makeStyles({
	inputField: {
		// display: "block",
		// width: "90%",
		// marginBottom: "0.5"
	},
});

export const SigninPopup = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = () => {
		setSubmitting(true);
		axios
			.post(`${hwbountyAPI}/login`, {
				email,
				password,

			}).then(res => {
				setAuthorizationHeader(res.data.token);
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			}).catch(error => {
				console.log(error);
			})
	};
	return (
		<Dialog open={props.authOpen}
			onClose={() => props.setter(false)}
		>
			{submitting && <LinearProgress />}
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					<TextField
						autoFocuss
						type="email"
						label="Email Address"
						onChange={handleEmailChange}
						value={email}
						className={classes.inputField}
						style={{
							// marginBottom: "0.25rem"
						}}
					/>
					<br />
					<TextField
						type="password"
						label="Password"
						onChange={handlePasswordChange}
						value={password}
						className={classes.inputField}
					/>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleSubmit()} color="primary">
					Sign In
				</Button>
			</DialogActions>
		</Dialog>
	)
}



const mapStateToProps = (state) => ({
	UI: state.UI,
	user: state.user,
});


export default connect(mapStateToProps)(withSnackbar(SigninPopup));