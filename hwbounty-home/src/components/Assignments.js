// React
import React, { Component } from "react";

// MUI & Styling
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

// Components
import SchoologyAssignment from "./SchoologyAssignment";

const styles = (theme) => ({
  ...theme.spreadIt,
});

export class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [
        {
          title: "This is a test assignment",
          link: "google.com",
          due: "2021-3-15",
          id: ";SKDjf;slkx;d",
        },
        {
          title: "another assigment",
          link: "facebook.com",
          due: "2021-4-1",
          id: ";LSKDjfs;lkdf",
        },
      ],
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h4">Assignments</Typography>
        {this.state.assignments.map((a) => {
          return (
            <SchoologyAssignment
              key={a.id}
              title={a.title}
              link={a.link}
              due={a.due}
            />
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(Assignments);
