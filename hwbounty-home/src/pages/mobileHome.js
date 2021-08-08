import {
  Card,
  CardMedia,
  Divider,
  InputBase,
  List,
  ListItem,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import Pages from "../util/pageDictionary";
import { ModuleCard } from "../components/ModuleCard";
import useForceUpdate from "../util/useForceUpdate";
import CTimeSmall from "../components/Home/CTimeSmall";
import { useHistory } from "react-router";
import getTimePhrase from "../util/getTimePhrase";
import { connect } from "react-redux";
import { Today } from "@material-ui/icons";
import moment from "moment";
import t from "../util/localization/localization";

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
    background: (theme) => (theme ? "rgb(35,35,35)" : "rgb(230,230,230)"),
  },
  timeUntilText: {
    fontSize: "5vmin",
    fontFamily: "Poppins",
    textAlign: "left",
    marginLeft: "10%",
    marginRight: "10%",
  },
  greetingText: {
    display: "inline",
    fontFamily: "Oswald",
    verticalAlign: "middle",
  },
  greetingIMG: {
    width: "20vw",
    height: "20vw",
    verticalAlign: "middle",
  },
  searchIMG: {
    height: "4rem",
    verticalAlign: "middle",
  },
  greetingDiv: {
    marginTop: "10vw",
  },
  time: {
    width: "80vw",
    borderRadius: 10,
    paddingBottom: "5vh",
    textAlign: "center",
    color: (theme) => (!theme ? "rgb(88,88,88)" : "rgb(230,230,230)"),
  },
  scheduleText: {
    fontFamily: "Poppins",
    fontSize: "1.6rem",
    margin: "10%",
    fontWeight: "500",
    marginTop: "5%",
    marginBottom: "2.5%",
    verticalAlign: "middle",
  },
  scheduleCover: {
    height: "17.5vh",
    filter: (theme) => `brightness(${theme === 0 ? 70 : 30}%)`,
  },
  timeCardDiv: {
    width: "100vw",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    flexDirection: "column",
  },
  searchBar: {
    width: "80vw",
    marginTop: "5vw",
    margin: "10vw",
    padding: "1vmin",
    //   maxHeight: "40%",
    paddingLeft: "2vmin",
    borderRadius: "100vh",
    textAlign: "left",
  },
  card: {
    boxShadow:
      "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)!important",
    background: (theme) => (theme ? "rgb(40,40,40)" : "rgb(240,240,240)"),
    borderRadius: "1vmin",
  },
}));
export const TimeCardMobile = (props) => {
  const forceUpdate = useForceUpdate();
  const { theme } = props;
  const history = useHistory();
  const redirect = (path) => {
    history.push(path);
  };
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
      <CardMedia
        image="https://i.ibb.co/Jpn86gb/KI-0fw7-R6ndtscv-ROmgu8-MYv-UO5di-Hf-EIrbtv-RGb-Lnv-Bdo72k-NIcy6t-RCklg-ILjkf-Krn-QQZGW9-CZx-CHH9-TN.png"
        title="hwBounty Scheduule"
        className={`${classes.scheduleCover}`}
      />
      <Typography className={classes.scheduleText} align="left">
        <Today className={classes.scheduleIcon} />
        {t("mobileHome.schedule")}
      </Typography>
      <div className={`${classes.scheduleImg}`}>
        <Typography className={classes.timeUntilText} align="center">
          {getTimePhrase()}
        </Typography>
      </div>
      &nbsp;
      <Typography
        variant="h5"
        style={{
          fontSize: "5vmin",
          fontFamily: "Poppins",
          fontWeight: "500",
          textAlign: "left",
          marginLeft: "10%",
        }}
      >
        {
          /*moment().format(window.innerWidth <= 1368 ? "M/D/YYYY h:mm:ss A" : "dddd MMMM Do h:mm:ss A")*/ moment().format(
            "h:mm:ss A"
          )
        }
      </Typography>
      <Typography
        variant="h5"
        style={{
          fontSize: "5vmin",
          fontFamily: "Poppins",
          fontWeight: "500",
          textAlign: "left",
          marginLeft: "10%",
        }}
      >
        {
          /*moment().format(window.innerWidth <= 1368 ? "M/D/YYYY h:mm:ss A" : "dddd MMMM Do h:mm:ss A")*/ moment().format(
            "dddd M/D/YYYY"
          )
        }
      </Typography>
    </Card>
  );
};
export const MobileHome = (props) => {
  const forceUpdate = useForceUpdate();
  const {
    UI: { theme },
  } = props;
  const classes = useStyles(theme);
  const history = useHistory();
  const redirectToSchedule = () => {
    history.push("/schedule");
  };
  const redirect = (pathname) => {
    history.push(pathname);
  };
  const timeout = useRef();
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
  useEffect(() => {
    let run = true;
    (async () => {
      await sleep(500 - (Date.now() % 500));
      let lastTime = Date.now();
      while (run) {
        await sleep(500 - (Date.now() % 500));
        forceUpdate();
        lastTime = Date.now();
      }
    })();
    return () => {
      run = false;
    };
  }, []);
  const renderList = (fuse, query) => {
    let list = fuse
      .search(query)
      .filter((x, i) => i < 10)
      .map((result) => {
        return (
          <ListItem
            button
            onClick={() => redirect(result.item.path)}
            style={{ justifyContent: "center" }}
          >
            {result.item.name}
          </ListItem>
        );
      });
    let newList = [];
    if (list[0]) newList.push(list[0]);
    for (let i = 1; i < list.length; i++) {
      newList.push(<Divider />);
      newList.push(list[i]);
    }
    return React.Children.toArray(newList);
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
    return <List>{renderList(fuse, query)}</List>;
    // ModuleCard
  };
  return (
    <div>
      <div className={classes.greetingDiv}>
        <Typography
          className={classes.greetingText}
          align="center"
          style={{
            fontSize: `${
              50 -
              (JSON.parse(localStorage.getItem("user"))?.firstName
                ? `Welcome back ${
                    JSON.parse(localStorage.getItem("user"))?.firstName
                  }!`
                : "Welcome to HWBounty!"
              ).length *
                2.35
            }vw`,
          }}
        >
          <img
            src="https://cdn.discordapp.com/attachments/836672960566919228/838871035117568120/frogfinal-01.png"
            className={classes.greetingIMG}
          />{" "}
          {JSON.parse(localStorage.getItem("user"))?.firstName
            ? `Welcome back ${
                JSON.parse(localStorage.getItem("user"))?.firstName
              }!`
            : "Welcome to HWBounty!"}{" "}
        </Typography>
      </div>
      <Card className={`${classes.card} ${classes.searchBar}`}>
        <form>
          <img
            src="https://cdn.discordapp.com/attachments/836672960566919228/840713461515812864/frogmg-01.png"
            className={classes.searchIMG}
          />
          <InputBase
            placeholder="&nbsp;What’cha looking for?"
            className={`${classes.searchBarText}`}
            inputProps={{ "aria-label": "search" }}
            id="pageSearchBox"
            onChange={forceUpdate}
          />
        </form>
      </Card>
      <div className={classes.timeCardDiv}>
        <TimeCardMobile theme={theme} />
      </div>
      <Card
        style={{
          width: "80vw",
          marginTop: "5vw",
          margin: "10vw",
          maxHeight: "40%",
          minHeight: "256px",
          height: "256px",
          borderRadius: 10,
          textAlign: "center",
          marginBottom: "10vw",
        }}
        className={`${classes.card}`}
      >
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
export default connect(mapStateToProps)(MobileHome);
