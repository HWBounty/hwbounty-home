// React
import React, { Component } from "react";

// MUI Stuff
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowLeftRounded from "@material-ui/icons/ArrowLeftRounded";
import ArrowRightRounded from "@material-ui/icons/ArrowRightRounded";
import { withStyles } from "@material-ui/core/styles";

// MUI Treasury
import { useRoundInputBaseStyles } from "@mui-treasury/styles/inputBase/round";

// Components / Modules
import Assignments from "../components/Calendar/Assignments";
import Schedule from "../components/Calendar/Schedule";
import ModuleViewer from "../components/Modules/ModuleViewer";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  root: {
    marginLeft: 50,
    marginRight: 50,
    //minHeight: "100%",
  },
  searchBar: {
    width: "20%",
  },
  divGridContainer: {
    marginTop: 50,
  },
  gridContainer: {
    //height: "100%",
  },
  card: {
    //height: "auto",
    //borderRadius: theme.spacing(2),
  },
  toggleVisibleButton: {},
});

const SearchBar = (props) => {
  const roundInput = useRoundInputBaseStyles();
  return (
    <InputBase
      classes={roundInput}
      placeholder="Search on HWBounty Forums..."
      {...props}
    />
  );
};

export const Home = (props) => {
  const {
    classes,
    user: { authenticated },
  } = props;

  return (
    <div className={classes.root}>
      <h1>HWBounty</h1>
      <SearchBar className={classes.searchBar} />
      <div className={classes.divGridContainer}>
        <Grid
          container
          spacing={3}
          className={classes.gridContainer}
          wrap="wrap"
        >
          <Grid item xs={12} md>
            <Card className={classes.card}>
              <Schedule />
            </Card>
          </Grid>
          <Grid item xs={12} md>
            <Card className={classes.card}>
              <Assignments />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <ModuleViewer />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Home));
