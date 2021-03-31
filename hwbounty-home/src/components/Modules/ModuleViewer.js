// React
import { Fragment, useState } from "react";
import PropTypes from "prop-types";

// MUI
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

// Modules
import Calculator from "./Calculator";

const styles = {
  root: {
    height: "100%",
    flex: 1,
  },
};

export const ModuleViewer = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Calculator />
    </div>
  );
};

export default withStyles(styles)(ModuleViewer);
