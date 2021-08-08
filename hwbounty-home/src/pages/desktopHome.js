import {
  Card,
  CardMedia,
  Divider,
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
import CTime2 from "../components/Home/CTime";
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
    boxShadow: theme => theme === 1 ?
      "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)!important" :
      "0 3px 6px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.01)!important",
    backgroundColor: (theme) => (theme === 1 ? "rgb(40,40,40)" : "rgb(244,250,251)"),
    borderRadius: "1vmin",
  },
  timeUntilText: {
    fontSize: "1.25rem",
    fontFamily: "Poppins",
    textAlign: "left",
    marginLeft: "10%",
    marginRight: "10%",
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
    width: "38vmin",
    minHeight: "38vmin",
    marginBottom: "5vw",
    paddingBottom: "1.5rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      boxShadow: theme => theme === 1 ?
        "0 5px 12px rgba(0,0,0,0.3), 0 5px 12px rgba(0,0,0,0.4)!important" :
        "0 5px 16px rgba(0,0,0,0.15), 0 5px 16px rgba(0,0,0,0.015)!important",
    },
    transform: "scale(1)",
    // position: "fixed",
    // top: "15%",
    // left: "5%",
    color: (theme) => (!theme ? "rgb(88,88,88)" : "rgb(244 250 251)"),
  },
  searchBar: {
    width: "60vw",
    marginTop: "5vw",
    // margin: "10vw",
    verticalAlign: "middle",
    //   maxHeight: "40%",
    height: "8vmin",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
  },
  searchResults: {
    width: "60vw",
    // margin: "10vw",
    verticalAlign: "middle",
    //   maxHeight: "40%",
    // height: "60vh",
    textAlign: "center",
    // left: "35vw",
    // top: "25%",
    padding: "5vh",
    paddingTop: "1vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    background: "rgba(0,0,0,0)!important",
    boxShadow: "none!important",
  },
  scheduleText: {
    fontFamily: "Poppins",
    fontSize: "1.5rem",
    margin: "10%",
    fontWeight: "500",
    marginTop: "5%",
    marginBottom: "2.5%",
    verticalAlign: "middle",
  },
  scheduleIcon: {
    verticalAlign: "middle",
    margin: "0.5vmin",
    marginRight: "0.25vmin",
  },
  rightSide: {
    position: "relative",
    width: "",
  },
  scheduleCover: {
    height: "17.5vmin",
    filter: (theme) => `brightness(${theme === 0 ? 70 : 30}%)`,
  },
  miniCard: {
    width: "30vmin",
    height: "15vmin",
  },
  mainDiv: {
    display: "flex",
  },
  timeCardDiv: {
    width: "calc(40vmin + 5%)",
    display: "flex",
    height: "100vh",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    marginLeft: "5vw",
    flexWrap: "wrap",
  },
  dataDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexGrow: 1,
  },
  generalLabel: {
    fontFamily: "Poppins",
    fontSize: "2rem",
    textAlign: "left",
    width: "100%",
    marginBottom: "2vmin",
    // paddingLeft: "5%",
  },
  qaccessLabel: {
    marginTop: "15%",
    width: "35vmin",
  },
  reccomendedLabel: {
    marginTop: "5%",
    width: "55vw",
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
      <CardMedia
        image="https://i.ibb.co/Jpn86gb/KI-0fw7-R6ndtscv-ROmgu8-MYv-UO5di-Hf-EIrbtv-RGb-Lnv-Bdo72k-NIcy6t-RCklg-ILjkf-Krn-QQZGW9-CZx-CHH9-TN.png"
        title="hwBounty Scheduule"
        className={`${classes.scheduleCover}`}
      />
      {/* <Typography className={classes.scheduleText} align="left">
        <Today className={classes.scheduleIcon} />
        {t("desktopHome.schedule")}
      </Typography> */}
      <br />
      <div className={`${classes.scheduleImg}`}>
        <Typography className={classes.timeUntilText} align="center">
          {getTimePhrase()}
        </Typography>
      </div>
      &nbsp;
      <Typography
        variant="h5"
        style={{
          fontSize: "1rem",
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
          fontSize: "1rem",
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
      <br />
      <Divider />
      <br />
      <Typography
        variant="h5"
        style={{
          fontSize: "1rem",
          fontFamily: "Poppins",
          fontWeight: "500",
          textAlign: "left",
          marginLeft: "10%",
          color: "#69B4AC"
        }}
      >
        {
          t("desktopHome.viewFullSchedule")
        }
      </Typography>
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
    let searchArr = fuse.search(query).filter((x, i) => i < 4);
    while (searchArr.length < 4) {
      searchArr.push({
        item: {
          blank: true,
        },
      });
    }
    return (
      React.Children.toArray(
        searchArr.map((result) => {
          return (
            <ModuleCard
              icon={result.item.icon}
              name={result.item.name}
              desc={result.item.desc}
              path={result.item.path}
              theme={theme}
              color={
                theme
                  ? result.item.defaultColorDarkMode
                  : result.item.defaultColorLightMode
              }
            />
          );
        })
      )
    );
    // ModuleCard
  };
  return (
    <div className={classes.mainDiv}>
      <div className={classes.timeCardDiv}>
        <Typography
          className={`${classes.generalLabel} ${classes.qaccessLabel}`}
        >
          {t("desktopHome.quickAccess")}
        </Typography>
        <TimeCard theme={theme} />
      </div>
      <div className={`${classes.dataDiv}`}>
        <Card className={`${classes.card} ${classes.searchBar}`}>
          <form>
            <img
              src="https://cdn.discordapp.com/attachments/836672960566919228/840713461515812864/frogmg-01.png"
              className={classes.greetingIMG}
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
        <Typography
          className={`${classes.generalLabel} ${classes.reccomendedLabel}`}
        >
          {t("desktopHome.recommended")}
        </Typography>
        <div style={{}} className={`${classes.searchResults}`}>
          {React.Children.toArray(renderSearchPages())}
        </div>
      </div>
      {/* <Card className={`${classes.miniCard}`}>
        hi!
      </Card> */}

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
