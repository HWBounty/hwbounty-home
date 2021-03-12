// React
import React, { useState } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { setTheme } from "../redux/actions/uiActions";

// MUI & Styling
import AppBar from "@material-ui/core/AppBar";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useMinimalSelectStyles } from "@mui-treasury/styles/select/minimal";

const styles = {
  root: {
    height: 50,
  },
};

export const Navbar = (props) => {
  const { classes } = props;
  const [val, setVal] = useState(1);
  const minimalSelectClasses = useMinimalSelectStyles();
  const menuProps = {
    classes: {
      paper: minimalSelectClasses.paper,
      list: minimalSelectClasses.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };
  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon
        className={props.className + " " + minimalSelectClasses.icon}
      />
    );
  };
  const handleChange = (event) => {
    setVal(event.target.value);
    console.log(event.target.value);
    props.setTheme(event.target.value);
  };
  return (
    <div className={classes.root}>
      <AppBar>
        <Grid container>
          <Grid item xs={5} />
          <Grid item xs={3}>
            <FormControl>
              <Select
                disableUnderline
                classes={{ root: minimalSelectClasses.select }}
                MenuProps={menuProps}
                IconComponent={iconComponent}
                value={val}
                onChange={handleChange}
              >
                <MenuItem value={0}>Light</MenuItem>
                <MenuItem value={1}>Dark</MenuItem>
                <MenuItem value={2}>Titan</MenuItem>
                <MenuItem value={3}></MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  setTheme: PropTypes.func.isRequired,
};

export default connect(null, { setTheme })(withStyles(styles)(Navbar));
