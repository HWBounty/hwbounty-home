// React
import { useState, useEffect } from "react";

// MUI
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

// Redux
import { connect } from "react-redux";
import {
  calc_addVariable,
  calc_removeVariable,
} from "../../../redux/actions/moduleActions";

const styles = (theme) => ({
  ...theme.spreadIt,
  paper: {
    ...theme.spreadIt.paper,
    height: "100%",
  },
});

export const CalcSettings = (props) => {
  const {
    module: {
      calculator: { variables },
    },
    calc_addVariable,
    calc_removeVariable,
    classes,
  } = props;
  return (
    <Paper className={classes.paper}>
      <div>hiiiiiiii</div>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  module: state.module,
});

export default connect(mapStateToProps, {
  calc_addVariable,
  calc_removeVariable,
})(withStyles(styles)(CalcSettings));
