// React
import React, { Component, useEffect, useRef, useState } from "react";

// MUI Stuff
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";

// Components / Modules
import Fuse from "fuse.js";
// Redux
import { connect } from "react-redux";
import { Paper, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Pages from "../util/pageDictionary";
import { ModuleCard } from "../components/ModuleCard";
import CTime from "../components/Home/CTime";
import CTimeSmall from "../components/Home/CTimeSmall";
import getTimePhrase from "../util/getTimePhrase";



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  paper: {
    width: "80vw",
    height: "80vw",
    display: "inline-block",
  },
  title: {
    fontSize: "60px",
    // fontFamily: "",
  },
  formLabel: {
    display: "block",
  },
  formGroup: {
    display: "inline",
  },
  card: {
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)!important",
  },
  timeUntilText: {
    fontSize: window.innerHeight / 25,
    fontFamily: "Nunito",
  },
  timeUntilTextMobile: {
    fontSize: window.innerWidth / 20,
    fontFamily: "Nunito",
  }
}));
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
  return null;
}
const useForceUpdate = () => {
  const set = useState(0)[1];
  return () => set((s) => s + 1);
};
export const Home = (props) => {
  const {
    // classes,
    user: { authenticated },
  } = props;
  const forceUpdate = useForceUpdate();
  const classes = useStyles();
  const [rerenderPage, setRerenderPage] = useState(0);
  useEffect(() => {
    setTimeout(() => setInterval(forceUpdate, 125), 1000 - (Date.now() % 1000));
  });

  const history = useHistory();
  const redirectToSchedule = () => {
    history.push("/schedule");
  };

  const renderSearchPages = () => {
    const {
      UI: { theme },
    } = props;
    let query = document.getElementById("pageSearchBox")?.value;
    if (!query) return null;
    const fuseOptions = {
      includeScore: true,
      // Search in `author` and in `tags` array
      keys: ["name", "description", "tags"],
    };
    const pageArray = Object.values(Pages);
    const fuse = new Fuse(pageArray, fuseOptions);
    return (
      <div>
        {React.Children.toArray(
          fuse
            .search(query)
            .filter((x, i) => i < 10)
            .map((result) => {
              return (
                <ModuleCard
                  icon={result.item.icon}
                  name={result.item.name}
                  desc={result.item.desc}
                  path={result.item.path}
                  color={
                    theme
                      ? result.item.defaultColorDarkMode
                      : result.item.defaultColorLightMode
                  }
                />
              );
            })
        )}
      </div>
    );
    // ModuleCard
  };  
  if (window.innerWidth >= 1250) {
    return (
      <div >

        <Card onClick={redirectToSchedule} classes={classes.time} style={{
          position: "fixed",
          width: "30vw",
          maxHeight: "40%",
          borderRadius: 10,
          top: "10%",
          left: "5%",
          paddingLeft: 20,
          textAlign: "center",
        }}>
          <Typography className={classes.timeUntilText} align="left">{getTimePhrase()}</Typography>
          {<CTime />}

        </Card>
        <Card
          style={{
            position: "absolute",
            width: "55vw",
            maxHeight: "200px",
            borderRadius: 10,
            top: "10%",
            left: "40%",
            textAlign: "center",
          }}
        >
          <form>
            <TextField
              placeholder={"Search for Page..."}
              label={"Search"}
              classes={classes.searchBox}
              id="pageSearchBox"
              style={{
                width: "90%",
              }}
            />
          </form>
        </Card>
        <Card
          style={{
            position: "absolute",
            width: "55vw",
            maxHeight: "40%",
            minHeight: "256px",
            height: "256px",
            borderRadius: 10,
            top: "calc(130px + 15%)",
            left: "40%",
            textAlign: "center",
            padding: "0",
            overflowX: "scroll",
          }}
        >
          {React.Children.toArray(renderSearchPages())}
        </Card>
        <Typography
          style={{
            position: "absolute",
            width: "55vw",
            maxHeight: "40%",
            minHeight: "256px",
            height: "256px",
            borderRadius: 10,
            top: "calc(300px + 32vh)",
            left: "40%",
            // marginTop:"100",
            textAlign: "center",
            padding: "0",
            marginBottom: "100px",
            overflowX: "scroll",
            fontFamily: "Nunito",
            fontSize: "32px",
          }}
          variant="h5"
        >
          Recommended Modules
        </Typography>
        <Card
          style={{
            position: "absolute",
            width: "55vw",
            maxHeight: "40%",
            minHeight: "256px",
            height: "256px",
            borderRadius: 10,
            top: "calc(350px + 33vh)",
            left: "40%",
            // marginTop:"100",
            textAlign: "center",
            padding: "0",
            marginBottom: "100px",
            overflowX: "scroll",
          }}
        >
          {React.Children.toArray(renderSearchPages())}
        </Card>

        {/* <ForumSearch />
        <DesktopLayout />
        <MobileLayout /> */}
      </div>
    );
  }
  else {
    return (
      <div >

        <Card onClick={redirectToSchedule} classes={classes.time} style={{
          width: "80vw",
          maxHeight: "40%",
          borderRadius: 10,
          paddingLeft: 20,
          margin: "10vw",
          textAlign: "center",
        }}>
          <Typography className={classes.timeUntilTextMobile} align="left">{getTimePhrase()}</Typography>
          {<CTimeSmall />}

        </Card>
        <Card style={{
          width: "80vw",
          margin: "10vw",
          maxHeight: "40%",

          borderRadius: 10,
          textAlign: "center",
        }}>
          <form>
            <TextField placeholder={"Search for Page..."} label={"Search"} classes={classes.searchBox} id="pageSearchBox" style={{
              width: "90%",
            }} />
          </form>
        </Card>
        <Card style={{
          width: "80vw",
          margin: "10vw",
          maxHeight: "40%",
          minHeight: "256px",
          height: "256px",
          borderRadius: 10,
          textAlign: "center",
          overflowX: "scroll",
        }}>
          {React.Children.toArray(renderSearchPages())}
        </Card>
        <Typography style={{
          width: "100vw",
          borderRadius: 10,
          // marginTop:"100",
          textAlign: "center",
          padding: "0",
          fontFamily: "Nunito",
          fontSize: "32px"
        }} variant="h5" align="center">Recommended Modules</Typography>
        <Card style={{
          width: "80vw",
          margin: "10vw",
          maxHeight: "40%",
          minHeight: "256px",
          height: "256px",
          borderRadius: 10,
          textAlign: "center",
          overflowX: "scroll",
        }}>
          {React.Children.toArray(renderSearchPages())}
        </Card>

        {/* <ForumSearch />
        <DesktopLayout />
        <MobileLayout /> */}
      </div>
    );
  }

};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps)(Home);
