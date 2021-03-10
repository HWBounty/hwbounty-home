// React
import React, { Component } from "react";

// MUI Stuff
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";

// MUI Treasury
import { useRoundInputBaseStyles } from "@mui-treasury/styles/inputBase/round";

// Components
import Assignments from "../components/Assignments";
import Calculator from "../components/Calculator";
import Schedule from "../components/Schedule";

const styles = {
  root: {
    marginLeft: 50,
    marginRight: 50,
  },
  searchBar: {
    width: "20%",
  },
  grid: {
    height: "100%",
  },
  scheduleCard: {
    height: "100%",
  },
};

const SearchBar = (props) => {
  const roundInput = useRoundInputBaseStyles();
  return (
    <InputBase
      classes={roundInput}
      placeholder="Search on HWBounty Forums..."
      className={props.className}
    />
  );
};

export class home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1>HWBounty</h1>
        <SearchBar className={classes.searchBar} />
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Card className={classes.scheduleCard}>
              <Schedule />
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card className={classes.scheduleCard}>
              <Assignments />
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(home);
