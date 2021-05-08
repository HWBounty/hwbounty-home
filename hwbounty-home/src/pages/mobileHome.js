import { Card, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import Pages from "../util/pageDictionary";
import { ModuleCard } from "../components/ModuleCard";
import useForceUpdate from "../util/useForceUpdate";
import CTimeSmall from "../components/Home/CTimeSmall";
import { useHistory } from "react-router";
import getTimePhrase from "../util/getTimePhrase";
import { connect } from "react-redux";

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
        background: (theme)=> theme? "rgb(51,51,51)":"rgb(230,230,230)",
    },
    timeUntilText: {
      fontSize: window.innerHeight / 25,
      fontFamily: "Nunito",
    },
    timeUntilTextMobile: {
      fontSize: window.innerWidth / 20,
      fontFamily: "Nunito",
    },
    greetingText:{
        display: "inline",
        fontFamily: "Oswald",
        verticalAlign: "middle",
    },
    greetingIMG:{
        width: "20vw",
        height: "20vw",
        verticalAlign: "middle",
    },
    greetingDiv: {
        marginTop: "10vw",
    },
    time: {
        width: "80vw",
        maxHeight: "40%",
        borderRadius: 10,
        paddingLeft: 20,
        margin: "10vw",
        marginTop: "5vw",
        marginBottom: "5vw",
        textAlign: "center",  
        color: (theme)=> !theme? "rgb(88,88,88)":"rgb(230,230,230)",
    },
    searchBar: {
        width: "80vw",
        marginTop: "5vw",
        margin: "10vw",
        padding: "3vw",
      //   maxHeight: "40%",

        borderRadius: 10,
        textAlign: "center",
      }
  }));
export const MobileHome = (props)=>{
    const forceUpdate = useForceUpdate();
    const {
        UI: { theme },
      } = props;
    const classes = useStyles(theme);
    useEffect(() => {
      setTimeout(() => setInterval(forceUpdate, 125), 1000 - (Date.now() % 1000));
    });
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
        <div className={classes.greetingDiv}>
            
            <Typography className={classes.greetingText} align="center" style={{
            fontSize: `${50-(JSON.parse(localStorage.getItem("user"))?.firstName ? `Welcome back ${JSON.parse(localStorage.getItem("user"))?.firstName}!` : "Welcome to HWBounty!").length*2.35}vw`
        }}><img src="https://cdn.discordapp.com/attachments/836672960566919228/838871035117568120/frogfinal-01.png" className={classes.greetingIMG}/> {JSON.parse(localStorage.getItem("user"))?.firstName ? `Welcome back ${JSON.parse(localStorage.getItem("user"))?.firstName}!` : "Welcome to HWBounty!"} </Typography>
        </div>
        <Card onClick={redirectToSchedule} className={`${classes.time} ${classes.card}`}>
        
          <CTimeSmall />
          <Typography className={classes.timeUntilTextMobile} align="center">{getTimePhrase()}</Typography>
        </Card>
        <Card 
        className={`${classes.card} ${classes.searchBar}`}
        >
          <form>
            <TextField placeholder={"Search for Page..."} label={"Navigate To Page"} classes={classes.searchBox} id="pageSearchBox" style={{
              width: "90%",
            }} />
          </form>
        </Card>
        <Card style={{
          width: "80vw",
          marginTop: "5vw",
          margin: "10vw",
          maxHeight: "40%",
          minHeight: "256px",
          height: "256px",
          borderRadius: 10,
          textAlign: "center",
          overflowX: "scroll",
          marginBottom: "10vw",
        }} className={`${classes.card}`}>
          {React.Children.toArray(renderSearchPages())}
        </Card>
        <Card style={{
          width: "80vw",
          marginTop: "5vw",
          margin: "10vw",
          maxHeight: "10vw%",
          minHeight: "10vw",
          height: "10vw",
          borderRadius: 10,
          textAlign: "center",
          overflowX: "scroll",
          marginBottom: "10vw",
          backgroundColor: "rgba(0,0,0,0)"
        }}>
        </Card>

        {/* <ForumSearch />
        <DesktopLayout />
        <MobileLayout /> */}
      </div>
    );
}
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
  });
export default connect(mapStateToProps)(MobileHome);