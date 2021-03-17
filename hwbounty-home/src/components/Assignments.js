// React
import React, { Component } from "react";

// MUI & Styling
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
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
          url: "https://google.com",
          due: "2021-3-15",
          id: ";SKDjf;slkx;d",
        },
        {
          title: "another assigment",
          url: "https://facebook.com",
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
        <Typography variant="h5">Assignments</Typography>
        <Divider />
        {this.state.assignments.map((a) => {
          return (
            <SchoologyAssignment
              key={a.id}
              title={a.title}
              url={a.url}
              due={a.due}
            />
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(Assignments);
