// React
import React, { Component, useState } from "react";
import '../home.css'
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
import { Container } from "@material-ui/core";
import { Calculator } from "../components/Modules/Calculator/Calculator";

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
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  render() {
    return (
      <div className = "base" id="baseHome">
        <Container className="base" id="headerContainer">
        <img align="left" src={localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")).pfp:""} className="pfp" alt=""/>
        <Typography variant="h1" id="welcomeText">
        {
          (()=>{
            
            if (this.state.user){
              if (!localStorage.getItem("user"))
              localStorage.setItem("user",JSON.stringify(this.state.user));
              return `Welcome back ${this.state.user.firstName} 👋!`;
            }else{
              axios.get("https://api.hwbounty.help/@me").then(res=>{
                if (res.status == 200 && res.data && res.data.password){
                  this.setState({user:res.data});
                } 
              });
            };
            if (localStorage.getItem("user")){
              return `Welcome back ${JSON.parse(localStorage.getItem("user")).firstName} 👋!`;
            };
          })()
          }
        </Typography>
        <Typography variant="subtitle1" id="bio">
          {(()=>{
            
            if (this.state.user){
              if (!localStorage.getItem("user"))
              localStorage.setItem("user",JSON.stringify(this.state.user));
              return `“ ${this.state.user.bio} ”`
            }
            axios.get("https://api.hwbounty.help/@me").then(res=>{
              if (res.status == 200 && res.data && res.data.password){
                this.setState({user:res.data});
                localStorage.setItem("user",JSON.stringify(res.data))
              } 
            })
            if (localStorage.getItem("user")){
              return `“ ${JSON.parse(localStorage.getItem("user")).bio} ”`;
            }
          })()}
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
        <Calendar id="calender"/>
        </Card>
        
      
      {/* //User Header */}
      
      {/* // <div className={classes.root}> */}
        
      {/* //   <ForumSearch /> */}
      {/* //   <DesktopLayout /> */}
      {/* //   <MobileLayout /> */}
      {/* // </div> */}
      </div>
    );
  }
}
export default connect()(withStyles(styles)(Home));
// export const Home = (props) => {
//   const {
//     classes,
//     user: { authenticated },
//   } = props;

//   const DesktopLayout = () => {
//     return (
//       <div className={classes.desktopLayout}>
//         <Grid
//           container
//           spacing={3}
//           className={classes.gridContainer}
//           wrap="wrap"
//         >
//           <Grid item md={4}>
//             <Calendar />
//           </Grid>
//           <Grid item md={5}>
//             <ModuleViewer />
//           </Grid>
//           <Grid item md={1} />
//           <Grid item md={2}>
//             <KeybindEditor />
//           </Grid>
//         </Grid>
//       </div>
//     );
//   };

//   const MobileLayout = () => {
//     return (
//       <div className={classes.mobileLayout}>
//         <Button></Button>
//       </div>
//     );
//   };


// };

// const mapStateToProps = (state) => ({
//   user: state.user,
// });

// export default connect(mapStateToProps)(withStyles(styles)(Home));
