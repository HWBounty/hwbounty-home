import { Card, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import Pages from "../util/pageDictionary";
import { ModuleCard } from "../components/ModuleCard";
import useForceUpdate from "../util/useForceUpdate";
import CTimeSmall from "../components/Home/CTimeSmall";
import { useHistory } from "react-router";
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
export const MobileHome = (props)=>{
    const forceUpdate = useForceUpdate();
    const classes = useStyles();
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
          <Typography className={classes.timeUntilTextMobile} align="center">{getTimePhrase()}</Typography>
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
export default MobileHome;