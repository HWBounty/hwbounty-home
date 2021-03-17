// React
import React, { Component } from "react";

// MUI Stuff
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

// MUI Treasury
import { useRoundInputBaseStyles } from "@mui-treasury/styles/inputBase/round";

// Components
import Assignments from "../components/Assignments";
import Calculator from "../components/Modules/Calculator";
import Schedule from "../components/Schedule";

const styles = (theme) => ({
  root: {
    marginLeft: 50,
    marginRight: 50,
    height: "100%",
  },
  searchBar: {
    width: "20%",
  },
  gridContainer: {
    height: "100%",
    marginTop: 50,
  },
  card: {
    height: "100%",
    borderRadius: theme.spacing(2),
  },
});

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
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs>
            <Card className={classes.card}>
              <Schedule />
            </Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card}>
              <Assignments />
            </Card>
          </Grid>
          <Grid item xs={false} lg={8}></Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(home);
