// React
import React, { Component } from "react";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";

// Components
import SchoologyAssignment from "./SchoologyAssignment";

const styles = {};

export class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [
        {
          title: "This is a test assignment",
          link: "google.com",
          due: "2021-3-15",
        },
        {
          title: "another assigment",
          link: "facebook.com",
          due: "2021-4-1",
        },
      ],
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <SchoologyAssignment title="hi" link="hi" due="hi" />
        {this.state.assignments.map((a) => {
          <SchoologyAssignment title={a.title} link={a.link} due={a.due} />;
        })}
      </div>
    );
  }
}

export default withStyles(styles)(Assignments);
