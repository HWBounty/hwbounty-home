import {
  Button,
  Card,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
  Zoom,
  SvgIcon,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { useEffect, useState } from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import { hwbountyAPI } from "../redux/types";
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: (theme) => theme === 1 ? "rgb(48,48,48)" : "rgb(250,250,250)",
    borderStyle: "solid",
    borderColor: (theme) => theme === 1 ? "rgb(60,60,60)" : "rgb(230,230,230)",
  },
  hwbountyTitle: {
    fontFamily: "Oswald",
    fontWeight: "400",
    color: theme => theme === 1 ? "#69B4AC" : "rgb(49,91,95)",
    textAlign: "left",
    marginTop: "2rem"
  },
  createAccountText: {
    fontFamily: "Poppins",
    textAlign: "left",
    fontSize: "2rem",
    fontWeight: "400",
    marginTop: "1rem"
  },
  listBG: {
    backgroundColor: (theme) => theme === 1 ? "rgb(50,50,50)" : "rgb(245,245,245)",
    borderStyle: "solid",
    borderColor: (theme) => theme === 1 ? "rgb(60,60,60)" : "rgb(240,240,240)",

  },
  listText: {
    fontFamily: "Nunito !important",
    fontSize: "1.5rem !important",
    fontWeight: 200
  },
  captionText: {
    color: (theme) => theme === 1 ? "rgb(143,146,150)" : "rgb(102,102,102)",
    width: "100%",
    marginTop: "1rem"
  },
  secondaryOptionButton: {
    "text-transform": "none!important",
    fontFamily: "Poppins",
    fontSize: "1.3rem",
    fontWeight: "400",
    color: "#69B4AC"
  },
  primaryOptionButton: {
    "text-transform": "none!important",
    fontFamily: "Poppins",
    fontSize: "1.3rem",
    fontWeight: "400",
    color: "rgb(255,255,255)!important",
    backgroundColor: "#69B4AC",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    "&:hover": {
      backgroundColor: "#8CE0D7",
    }
  },
  rightSideBackground: {
    backgroundColor: (theme) => theme === 1 ? "rgb(122,178,172)" : "rgb(158,222,215)",
  },
  shortInputBox: {
    margin: "0.5rem 0.1rem 0.5rem 0.1rem",
    width: "22.5ch",
  },
  mediumInputBox: {
    margin: "0.5rem 0.1rem 0.5rem 0.1rem",
    width: "calc( 1.3rem + 45ch )",
  },
}
));
export const SignupPage = (props) => {
  const {
    UI: { theme },
  } = props;
  const classes = useStyles(theme);
  const [pageNumber, setPageNumber] = useState(0);
  const getSignupPage = () => {

  }
  useEffect(() => {
    return () => {
      localStorage.removeItem("signupStep1Data")
    }
  }, [])
  const history = useHistory()
  // const handle

  if (localStorage.getItem("DBIdToken")) history.push("/");
  return (
    <Zoom in
      style={{ transitionDelay: "1500ms" }}
      timeout={750}
    >
      <Card
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80.9rem",
          height: "50rem",
          borderRadius: "1rem",
          display: "flex",

        }}
        className={`${classes.card}`}
      >
        <Container style={{
          minWidth: "55%",
          marginLeft: "5%",
          paddingTop: "3%",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "3%",

        }}>
          <Typography variant="h1" className={`${classes.hwbountyTitle}`}> HWBounty </Typography>
          <Typography variant="h5" className={`${classes.createAccountText}`}> Create your HWBounty account </Typography>
          <div style={{ backgroundColor: "", minWidth: "90%", flexGrow: 1 }}>
            {[<Page0 styles={classes} pageSwitch={setPageNumber} />, <Page1 styles={classes} pageSwitch={setPageNumber} />][pageNumber]}
          </div>

        </Container>
        <Container style={{
          minWidth: "40%",
          display: "flex",

        }} className={`${classes.rightSideBackground}`}>
          <img src="https://raw.githubusercontent.com/HWBounty/HWBountyAssets/e516e7e0e6e61185390dbfc06ec14ae68a25eef1/Hopper_rush.svg" width="" />
        </Container>

      </Card >
    </Zoom >
  );
}
const Page1 = (props) => {
  const classes = props.styles;
  const { pageSwitch } = props;
  const signupWithEmail = () => {
    pageSwitch(0);
  };
  const [selectedType, setselectedType] = useState(-1)
  const onNext = async () => {
    if (selectedType === 0) {
      let thing = await axios.post(`${hwbountyAPI}/schoologyAuth`, {
        redirectURL: `${window.location.origin}/schoologyCallback`
      });
      thing = thing.data || thing;
      if (thing && thing.nonce && thing.url) {
        localStorage.setItem("SchoologyNonce", thing.nonce);
        window.location.href = thing.url;
      }
    }
  };
  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    usernameError: "",
    passwordError: "",
    passwordConfirmError: "",
  })
  const onSubmit = async () => {
    const [
      firstName,
      lastName,
      email,
      username,
      password,
      passwordConfirm,
    ] = [
        document.getElementById("firstName").value,
        document.getElementById("lastName").value,
        document.getElementById("email").value,
        document.getElementById("username").value,
        document.getElementById("password").value,
        document.getElementById("passwordConfirm").value,
      ];
    setErrors({
      firstNameError: !firstName && "First Name required",
      lastNameError: !lastName && "Last Name required",
      emailError: !email && "Email required",
      usernameError: !username && "Username required",
      passwordError: !passwordConfirm && "Password required",
      passwordConfirmError: !passwordConfirm && "Please confirm your password",
    });
    if (password !== passwordConfirm && password) {
      setErrors(Object.assign({}, errors, {
        passwordError: "Passwords do not match",
        passwordConfirmError: "Passwords do not match",
      }));

    }
    if (Object.values(errors).filter(x => x).length) return false;
    const data = {
      firstName,
      lastName,
      email,
      username,
      password,
    };
    localStorage.setItem("signupStep1Data", JSON.stringify(data));

  }
  const [firstName, setFirstName] = useState(JSON.parse(localStorage.getItem("signupStep1Data"))?.firstName || "");
  const [lastName, setLastName] = useState(JSON.parse(localStorage.getItem("signupStep1Data"))?.lastName || "");
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem("signupStep1Data"))?.email || "");
  const [username, setUsername] = useState(JSON.parse(localStorage.getItem("signupStep1Data"))?.username || "");
  const [password, setPassword] = useState(JSON.parse(localStorage.getItem("signupStep1Data"))?.password || "");
  const [passwordConfirm, setPasswordConfirm] = useState(JSON.parse(localStorage.getItem("signupStep1Data"))?.passwordConfirm || "");


  const onChange = (errorName) => {

    ({
      firstName: setFirstName,
      lastName: setLastName,
      email: setEmail,
      username: setUsername,
      password: setPassword,
      passwordConfirm: setPasswordConfirm,
    })[errorName.substring(0, errorName.length - 5)]
      (document.getElementById(errorName.substring(0, errorName.length - 5)).value);
    setErrors(Object.assign({}, errors, {
      [errorName]: "",
    }));
  }

  return <div>
    {/* <Typography style={{ textAlign: "left" }} className={`${classes.captionText}`}>Select school account type</Typography> */}
    <div style={{
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      alignItems: "flex-start",
      maxHeight: "20rem"
    }} >
      <Typography style={{ textAlign: "left" }} className={`${classes.captionText}`}>Enter the following below:</Typography>
      <div style={{ display: "flex", }}>
        <TextField
          id="firstName"
          label="First Name"
          variant="outlined"
          className={classes.shortInputBox}
          required
          error={!!errors.firstNameError}
          helperText={errors.firstNameError}
          onChange={() => onChange("firstNameError")}
          value={firstName}
        />
        <div style={{ marginLeft: "1rem" }} />
        <TextField
          id="lastName"
          label="Last Name"
          variant="outlined"
          className={classes.shortInputBox}
          required
          error={!!errors.lastNameError}
          helperText={errors.lastNameError}
          onChange={() => onChange("lastNameError")}
          value={lastName}
        />
      </div>
      <TextField
        id="email"
        label="Email Address"
        variant="outlined"
        className={classes.mediumInputBox}
        required
        error={!!errors.emailError}
        helperText={errors.emailError}
        onChange={() => onChange("emailError")}
        value={email}
      />
      <TextField
        id="username"
        label="Username"
        variant="outlined"
        className={classes.mediumInputBox}
        required
        error={!!errors.usernameError}
        helperText={errors.usernameError}
        onChange={() => onChange("usernameError")}
        value={username}
      />
      <div style={{ display: "flex" }}>
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          className={classes.shortInputBox}
          type="password"
          required
          error={!!errors.passwordError}
          helperText={errors.passwordError}
          onChange={() => onChange("passwordError")}
          value={password}
        />
        <div style={{ marginLeft: "1rem" }} />
        <TextField
          id="passwordConfirm"
          label="Confirm Password"
          variant="outlined"
          className={classes.shortInputBox}
          required
          type="password"
          error={!!errors.passwordConfirmError}
          helperText={errors.passwordConfirmError}
          onChange={() => onChange("passwordConfirmError")}
          value={passwordConfirm}
        />
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", marginRight: "5rem", marginTop: "8rem" }} >
      <Button className={`${classes.secondaryOptionButton}`} onClick={signupWithEmail}>Use school account instead</Button>
      <Button className={`${classes.primaryOptionButton}`} variant="contained" onClick={() => onSubmit()}>Sign Up</Button>
    </div>

  </div >;
}
const Page0 = (props) => {
  const { pageSwitch } = props;
  const classes = props.styles;
  const [selectedType, setselectedType] = useState(-1)
  const onNext = async () => {
    if (selectedType === 0) {
      let thing = await axios.post(`${hwbountyAPI}/schoologyAuth`, {
        redirectURL: `${window.location.origin}/schoologyCallback`
      });
      thing = thing.data || thing;
      if (thing && thing.nonce && thing.url) {
        localStorage.setItem("SchoologyNonce", thing.nonce);
        window.location.href = thing.url;
      }
    }
  };
  const signupWithEmail = () => {
    pageSwitch(1);
  };
  return <div>
    <Typography style={{ textAlign: "left" }} className={`${classes.captionText}`}>Select school account type</Typography>
    <div style={{
      borderRadius: "0.5rem",
      padding: "0.5rem",
      minHeight: "18rem",
      marginRight: "5rem",
      marginTop: "1rem",
      maxHeight: "15rem"
    }} className={`${classes.listBG}`}>
      <List>

        <ListItem button selected={selectedType === 0}
          onClick={() => setselectedType(0)}>

          <ListItemIcon>
            <img src="https://raw.githubusercontent.com/HWBounty/HWBountyAssets/2ec3802b934108a91412b68c737478a5435b18b2/schoology.svg" width="50rem" />
          </ListItemIcon>
          <ListItemText primary="Schoology" className={classes.listText} disableTypography />
        </ListItem>
        <ListItem button selected={selectedType === 1} disabled
          onClick={() => setselectedType(1)}>
          <ListItemIcon>
            <img src="https://raw.githubusercontent.com/HWBounty/HWBountyAssets/3b07e1baff026751f2b6af55b221f873fe8ce94e/powerschool.svg" width="50rem" />
          </ListItemIcon>
          <ListItemText primary="PowerSchool" className={classes.listText} disableTypography />
        </ListItem>
        <ListItem button selected={selectedType === 2} disabled
          onClick={() => setselectedType(2)}>
          <ListItemIcon>
            <img src="https://raw.githubusercontent.com/HWBounty/HWBountyAssets/7da83daf3eeeaea2585722168be7657786e19ffa/canvasstudent.svg" width="50rem" />
          </ListItemIcon>
          <ListItemText primary="Canvas Student" className={classes.listText} disableTypography />
        </ListItem>
        <ListItem button selected={selectedType === 3} disabled
          onClick={() => setselectedType(3)}>
          <ListItemIcon>
            <img src="https://raw.githubusercontent.com/HWBounty/HWBountyAssets/b6c194a63cc91657fc1351e39c4a067df7e079d2/googleclassroom.svg" width="50rem" />
          </ListItemIcon>
          <ListItemText primary="Google Classroom" className={classes.listText} disableTypography />
        </ListItem>
      </List>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", marginRight: "5rem", marginTop: "8rem" }} >
      <Button className={`${classes.secondaryOptionButton}`} onClick={signupWithEmail}>Sign-up with email instead</Button>
      {selectedType !== -1 && <Button className={`${classes.primaryOptionButton}`} variant="contained" onClick={() => onNext()}>Next</Button>}
    </div>

  </div >;
}
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
export default connect(mapStateToProps)(SignupPage);