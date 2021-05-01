// React
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// MUI
import Card from "@material-ui/core/Card";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import makeStyles from "@material-ui/core/styles/makeStyles";

// Redux
import { connect } from "react-redux";
import { setTheme, setAuthPopupOpen } from "../redux/actions/uiActions";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadIt,
  root: {
    display: "flex",
    "& > *": {
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
    display: "block",
  },
}));
export const Settings = (props) => {
  const classes = useStyles();
  const {
    UI: { theme },
    setTheme,
  } = props;

  const toggleDarkmode = (event, nv) => {
    const newVal = nv ? 1 : 0;
    localStorage.setItem("theme", newVal);
    setTheme(newVal);
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        Settings
      </Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={theme === 1}
              onChange={toggleDarkmode}
              name="darkmodeToggle"
            />
          }
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
  );
};
Settings.propTypes = {
  setTheme: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps, { setTheme })(Settings);
