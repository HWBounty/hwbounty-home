// React
import React, { Component, useState } from "react";
//import "../home.css";
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
import axios from "axios";
import { Avatar, Container, makeStyles } from "@material-ui/core";
import { Calculator } from "../components/Modules/Calculator/Calculator";
import { getRandomBackground } from "../util/randomBackground";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  getGreeting() {
    if (this.state.user) {
      if (!localStorage.getItem("user"))
        localStorage.setItem("user", JSON.stringify(this.state.user));
      return `Welcome back ${this.state.user.firstName} 👋!`;
    } else {
      axios.get("https://api.hwbounty.help/@me").then((res) => {
        if (res.status == 200 && res.data && res.data.password) {
          this.setState({ user: res.data });
        }
      });
    }
    if (localStorage.getItem("user")) {
      return `Welcome back ${
        JSON.parse(localStorage.getItem("user")).firstName
      } 👋!`;
    }
  }
  getBio() {
    if (this.state.user) {
      if (!localStorage.getItem("user"))
        localStorage.setItem("user", JSON.stringify(this.state.user));
      return `“ ${this.state.user.bio} ”`;
    }
    axios.get("https://api.hwbounty.help/@me").then((res) => {
      if (res.status === 200 && res.data && res.data.password) {
        this.setState({ user: res.data });
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    });
    if (localStorage.getItem("user")) {
      return `“ ${JSON.parse(localStorage.getItem("user")).bio} ”`;
    }
  }
  render() {
    return (
      <div className="base" id="baseHome">
        <Container
          className="base"
          style={{
            background: `url(${getRandomBackground()})top/cover`,
            "min-height": "20vh",
            "max-height": "20vh",
            "max-width": "100vw",
            width: "100%",
            "margin-left": "0px",
            "margin-right": "0px",
            "text-align": "left",
            overflow: "hidden",
            "text-overflow": "ellipsis",
            position: "relative",
          }}
        >
          <Avatar
            variant="rounded"
            align="left"
            src={
              localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user")).pfp
                : ""
            }
            className="pfp"
            alt={
              localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user")).firstName
                : "unknown"
            }
            imgProps={{
              style: {
                padding: "0px",
                "min-height": "15vh",
                "min-width": "15vh",
              },
            }}
            style={{
              padding: "0px",
              "margin-bottom": "2.5vh",
              "margin-left": "0.8vh",
              "min-height": "15vh",
              "min-width": "15vh",
            }}
          />
          <Typography variant="h1" id="welcomeText">
            {this.getGreeting}
          </Typography>
          <Typography variant="subtitle1" id="bio">
            {this.getBio}
          </Typography>

          {/* <h1 id="welcomeText">nyaaaa
        {
          (()=>{
            
            if (this.state.user){
              if (!localStorage.getItem("user"))
              localStorage.setItem("user",JSON.stringify(this.state.user));
              return `Welcome back ${this.state.user.firstName} 👋!`;
            }
            axios.get("https://api.hwbounty.help/@me").then(res=>{
              if (res.status == 200 && res.data && res.data.password){
                this.setState({user:res.data});
              } 
            })
            if (localStorage.getItem("user")){
              return `Welcome back ${JSON.parse(localStorage.getItem("user")).firstName} 👋!`;
            }
          })()
          }
          </h1> */}
        </Container>
        <Card id="calenderContainer">
          <Calendar id="calender" />
        </Card>
      </div>
    );
  }
}
