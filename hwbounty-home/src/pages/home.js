// React
import React, { Component, useState } from "react";

// MUI Stuff
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowLeftRounded from "@material-ui/icons/ArrowLeftRounded";
import ArrowRightRounded from "@material-ui/icons/ArrowRightRounded";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";

// Components / Modules
import ForumSearch from "../components/Home/ForumSearch";
import KeybindEditor from "../components/Home/KeybindEditor";
import Calendar from "../components/Calendar/Calendar";
import ModuleViewer from "../components/Modules/ModuleViewer";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  root: {
    paddingLeft: 50,
    //paddingRight: 50,
  },
  divGridContainer: {
    paddingTop: 50,
  },
});

export const Home = (props) => {
  const {
    classes,
    user: { authenticated },
  } = props;

  return (
    <div className={classes.root}>
      <h1>HWBounty</h1>
      <ForumSearch />
      <div className={classes.divGridContainer}>
        <Grid
          container
          spacing={3}
          className={classes.gridContainer}
          wrap="wrap"
        >
          <Grid item xs={12} sm={4}>
            <Calendar />
          </Grid>
          <Grid item xs={12} sm={5}>
            <ModuleViewer />
          </Grid>
          <Grid item sm={1} />
          <Grid item xs={12} sm={2}>
            <KeybindEditor />
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
