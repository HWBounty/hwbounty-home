// React
import React, { Component, useEffect, useRef, useState } from "react";

// MUI Stuff
import {
  makeStyles,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";

// Components / Modules
import Fuse from "fuse.js";
// Redux
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Pages from "../util/pageDictionary";
import { ModuleCard } from "../components/ModuleCard";
import MobileHome from "./mobileHome";
import DesktopHome from "./desktopHome";

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
      "8px 11px 16px -4px rgba(0,0,0,0.75)!important",
  },
  timeUntilText: {
    fontSize: window.innerHeight / 25,
    fontFamily: "Nunito",
  },
  timeUntilTextMobile: {
    fontSize: window.innerWidth / 20,
    fontFamily: "Nunito",
  },
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
  const timeout = useRef();
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
  useEffect(() => {
    let run = true;
    window.addEventListener("resize", forceUpdate);
    return () => {
      window.removeEventListener("resize", forceUpdate);
    };
  }, []);

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
  if (window.innerWidth >= 1300) {
    return <DesktopHome />;
  } else {
    return <MobileHome />;
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps)(Home);
