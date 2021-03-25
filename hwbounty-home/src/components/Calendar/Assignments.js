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

const dateToDay = (date) => {
  return dayjs(date).format("MM-DD-YYYY");
};

export class Assignments extends Component {
  componentDidMount() {
    this.props.getAssignments();
  }
  render() {
    const { classes, assignments } = this.props;

    // TODO: make it so that the keys are in by day, but the time of due date is preserved
    const datesArray = Array.from(
      new Set(assignments.map((a) => dateToDay(a.due)))
    );
    const assignmentByDay = {};
    assignments.forEach((a) => {
      if (assignmentByDay[dateToDay(a.due)])
        assignmentByDay[dateToDay(a.due)].push(a);
      else assignmentByDay[dateToDay(a.due)] = [a];
    });

    console.log(dayjs("12-07-2005").format("YYYY-MM-DD HH:MM:SS"));

    return (
      <div>
        <Typography variant="h5">Assignments</Typography>
        {React.Children.toArray(
          datesArray.map((date) => {
            return (
              <AssignmentsGroup
                date={date}
                assignments={assignmentByDay[date]}
              />
            );
          })
        )}
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
