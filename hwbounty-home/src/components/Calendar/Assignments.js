// React
import React, { Component } from "react";

// MUI & Styling
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import withStyles from "@material-ui/core/styles/withStyles";

// Components
import SchoologyAssignment from "./SchoologyAssignment";
import AssignmentsGroup from "./AssignmentsGroup";

// Redux
import { connect } from "react-redux";
import { getAssignments } from "../../redux/actions/dataActions";

import dayjs from "dayjs";

const styles = (theme) => ({
  ...theme.spreadIt,
});

export class Assignments extends Component {
  componentDidMount() {
    this.props.getAssignments();
  }
  render() {
    const { classes, assignments } = this.props;

    // make an array of unique dates based on a set
    const datesArray = Array.from(new Set(assignments.map((a) => a.due)));

    // TODO: pass assignments array to assignments group

    return (
      <div>
        <Typography variant="h5">Assignments</Typography>
        <Divider />
        {datesArray.map((date) => {
          return <AssignmentsGroup date={date} key={date} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assignments: state.data.assignments,
});

export default connect(mapStateToProps, { getAssignments })(
  withStyles(styles)(Assignments)
);
