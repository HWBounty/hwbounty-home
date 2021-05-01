import { Card, FormControlLabel, FormGroup, makeStyles, Paper, Typography, withStyles, Switch } from "@material-ui/core";
import { useState } from "react";
import { connect } from "react-redux";
import { getTheme } from "../components/Home/Navbar";
import PropTypes from "prop-types";
import { setTheme, setAuthPopupOpen } from "../redux/actions/uiActions";
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
	paper: {
		width: "80vw",
		height: "80vw",
		display: "inline-block",

	},
	title: {
		fontSize: "60px",
		// fontFamily: "",
	},
	formLabel: {
		display: "block"
	}
}));
export const Settings = (props) => {
	const classes = useStyles();
	const [darkMode, setDarkMode] = useState(!!getTheme());
	console.log(Object.keys(props));
	const toggleTheme = (newVal) => {
		localStorage.setItem("theme", newVal);
		// setThemeVal(newVal);
		props.setTheme(newVal);
	};
	const toggleDarkmode = (event, nv) => {
		setDarkMode(nv);
		toggleTheme(nv);
	}
	return (
		<Paper className={classes.paper}>
			<Typography variant="h5" className={classes.title}>
				Settings
			</Typography>
			<FormGroup row>
				<FormControlLabel
					control={<Switch checked={darkMode} onChange={toggleDarkmode} name="darkmodeToggle" />}
					label="Dark Mode :)"
					className={classes.formLabel}
				/>
				{/* <FormControlLabel
					control={
						<Switch
							checked={state.checkedB}
							onChange={handleChange}
							name="checkedB"
							color="primary"
						/>
					}
					label="Primary"
				/>
				<FormControlLabel control={<Switch />} label="Uncontrolled" />
				<FormControlLabel disabled control={<Switch />} label="Disabled" />
				<FormControlLabel disabled control={<Switch checked />} label="Disabled" /> */}
			</FormGroup>
		</Paper>
	)
};
Settings.propTypes = {
	setTheme: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	UI: state.UI,
	user: state.user,
});

export default connect(mapStateToProps, { setTheme, setAuthPopupOpen })(
	withStyles(styles)(Settings)
);
