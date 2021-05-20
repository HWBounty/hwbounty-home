import {
  Card,
  InputBase,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import Pages from "../util/pageDictionary";
import { ModuleCard } from "../components/ModuleCard";
import useForceUpdate from "../util/useForceUpdate";
import { useHistory } from "react-router";
import getTimePhrase from "../util/getTimePhrase";
import { connect } from "react-redux";
import CTime from "../components/Home/CTime";

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
    boxShadow: "8px 11px 16px -4px rgba(0,0,0,0.75)!important",
    background: (theme) => (theme ? "rgb(80,80,80)" : "rgb(230,230,230)"),
    borderRadius: "1vw",
  },
  timeUntilText: {
    fontSize: "1.5vw",
    fontFamily: "Poppins",
    color: "rgb(251,251,251)",
    textAlign: "center",
  },
  timeUntilTextMobile: {
    fontSize: window.innerWidth / 20,
    fontFamily: "Nunito",
  },
  greetingText: {
    display: "inline",
    fontFamily: "Oswald",
    verticalAlign: "middle",
  },
  greetingIMG: {
    width: "6vw",
    height: "6vw",
    verticalAlign: "middle",
    display: "inline-block",
  },
  searchBarText: {
    height: "90%",
    width: "50vw",
    fontSize: "1.5vw",
    fontFamily: "Nunito",
  },
  greetingDiv: {
    marginTop: "10vw",
  },
  time: {
    width: "25vw",
    height: "25vw",
    marginBottom: "5vw",
    textAlign: "center",
    position: "fixed",
    top: "15%",
    left: "5%",
    color: (theme) => (!theme ? "rgb(88,88,88)" : "rgb(230,230,230)"),
  },
  searchBar: {
    width: "60vw",
    marginTop: "5vw",
    // margin: "10vw",
    verticalAlign: "middle",
    //   maxHeight: "40%",
    height: "10vh",
    textAlign: "center",
    left: "35vw",
    top: "5%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
  },
  searchResults: {
    width: "60vw",
    marginTop: "5vw",
    // margin: "10vw",
    verticalAlign: "middle",
    //   maxHeight: "40%",
    padding: "1vw",
    height: "60vh",
    textAlign: "center",
    left: "35vw",
    top: "25%",
    padding: "5vh",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scheduleText: {
    fontFamily: "Poppins",
    fontSize: "2vw",
    margin: "10%",
    marginTop: "5%",
    marginBottom: "5%",
  },
  scheduleImg: {
    background:
      "url(https://github.com/HWBounty/HWBountyAssets/blob/main/nya1.png?raw=true)center/cover",
    width: "80%",
    height: "40%",
    borderRadius: "1vw",
    display: "flex",
    alignItems: "center",
    margin: "10%",
    marginTop: "5%",
    marginBottom: "5%",
    verticalAlign: "middle",
  },
  rightSide: {
    position: "relative",
    width: "",
  },
}));
export const TimeCard = (props) => {
  const forceUpdate = useForceUpdate();
  const { theme } = props;
  const history = useHistory();
  const redirectToSchedule = () => {
    history.push("/schedule");
  };
  const classes = useStyles(theme);
  const timeout = useRef();
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
  useEffect(() => {
    let run = true;
    (async () => {
      await sleep(250 - (Date.now() % 250));
      let lastTime = Date.now();
      while (run) {
        await sleep(250 - (Date.now() % 250));
        forceUpdate();
        lastTime = Date.now();
      }
    })();
    return () => {
      run = false;
    };
  }, []);
  return (
    <Card
      onClick={redirectToSchedule}
      className={`${classes.time} ${classes.card}`}
    >
      <Typography className={classes.scheduleText} align="left">
        Schedule
      </Typography>
      <div className={`${classes.scheduleImg}`}>
        <Typography className={classes.timeUntilText} align="center">
          {getTimePhrase()}
        </Typography>
      </div>
      <CTime />
    </Card>
  );
};
export const DesktopHome = (props) => {
  const {
    UI: { theme },
  } = props;
  const classes = useStyles(theme);
  const forceUpdate = useForceUpdate();
  const history = useHistory();
  const redirectToSchedule = () => {
    history.push("/schedule");
  };
  const renderSearchPages = () => {
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
      <div
        style={{
          maxWidth: "768px",
        }}
      >
        {React.Children.toArray(
          fuse
            .search(query)
            .filter((x, i) => i < 4)
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
  return (
    <div>
      <TimeCard theme={theme} />
      <Card className={`${classes.card} ${classes.searchBar}`}>
        <form>
          <img
            src="https://cdn.discordapp.com/attachments/836672960566919228/840713461515812864/frogmg-01.png"
            className={classes.greetingIMG}
          />
          <InputBase
            placeholder="Search…"
            className={`${classes.searchBarText}`}
            inputProps={{ "aria-label": "search" }}
            id="pageSearchBox"
            onChange={forceUpdate}
          />
        </form>
      </Card>
      <Card style={{}} className={`${classes.card} ${classes.searchResults}`}>
        {React.Children.toArray(renderSearchPages())}
      </Card>

      {/* <ForumSearch />
        <DesktopLayout />
        <MobileLayout /> */}
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
export default connect(mapStateToProps)(DesktopHome);
