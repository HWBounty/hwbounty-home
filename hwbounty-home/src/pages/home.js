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
import FullscreenModuleViewer from "../components/Modules/FullscreenModuleViewer";

// Redux
import { connect } from "react-redux";
import MusicModule from "../components/MusicModule/MusicModule";

const styles = (theme) => ({
  root: {
    paddingLeft: 50,
    [theme.breakpoints.down("md")]: {
      paddingRight: 50,
    },
  },
  desktopLayout: {
    paddingTop: 50,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  mobileLayout: {
    paddingTop: 30,
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});

export const Home = (props) => {
  const {
    classes,
    user: { authenticated },
  } = props;

  const DesktopLayout = () => {
    return (
      <div className={classes.desktopLayout}>
        <FullscreenModuleViewer />
        <Grid
          container
          spacing={3}
          className={classes.gridContainer}
          wrap="wrap"
        >
          <Grid item md={4}>
            <Calendar />
          </Grid>
          <Grid item md={5}>
            <ModuleViewer />
          </Grid>
          <Grid item md={1} />
          <Grid item md={2}>
            <KeybindEditor />
          </Grid>
        </Grid>
      </div>
    );
  };

  const MobileLayout = () => {
    return (
      <div className={classes.mobileLayout}>
        <Calendar />
        <br />
        <ModuleViewer />
        <Button></Button>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <h1>HWBounty</h1>
      <ForumSearch />
      <DesktopLayout />
      <MobileLayout />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Home));
