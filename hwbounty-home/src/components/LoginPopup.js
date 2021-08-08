import {
  Button,
  makeStyles,
  TextField,
  Typography,
  LinearProgress,
} from "@material-ui/core";

import axios from "axios";

import { useEffect, useState } from "react";

import { connect } from "react-redux";

import { useHistory } from "react-router-dom";

import { setAuthorizationHeader } from "../redux/actions/userActions";
import { hwbountyAPI } from "../redux/types";
import t from "../util/localization/localization";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: (theme) =>
      theme === 1 ? "rgb(48,48,48)" : "rgb(250,250,250)",
    borderStyle: "solid",
    borderColor: (theme) =>
      theme === 1 ? "rgb(60,60,60)" : "rgb(230,230,230)",
  },
  hwbountyTitle: {
    fontFamily: "Poppins",
    fontWeight: "400",
    color: (theme) => (theme === 1 ? "#69B4AC" : "rgb(49,91,95)"),
    textAlign: "left",
    marginTop: "2rem",
    fontSize: "24px",
  },
  subText: {
    fontFamily: "Nunito",
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "400",
    // marginTop: "1rem"
  },
  listBG: {
    backgroundColor: (theme) =>
      theme === 1 ? "rgb(50,50,50)" : "rgb(245,245,245)",
    borderStyle: "solid",
    borderColor: (theme) =>
      theme === 1 ? "rgb(60,60,60)" : "rgb(240,240,240)",
  },
  listText: {
    fontFamily: "Nunito !important",
    fontSize: "1.5rem !important",
    fontWeight: 200,
  },
  captionText: {
    color: (theme) => (theme === 1 ? "rgb(143,146,150)" : "rgb(102,102,102)"),
    width: "100%",
    marginTop: "1rem",
  },
  secondaryOptionButton: {
    "text-transform": "none!important",
    fontFamily: "Nunito",
    fontSize: "0.9rem",
    fontWeight: "800",
    color: "#69B4AC",
  },
  disableHoverEffect: {
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0)",
    },
  },
  primaryOptionButton: {
    "text-transform": "none!important",
    fontFamily: "Poppins",
    fontSize: "1rem",
    fontWeight: "400",
    color: "rgb(255,255,255)!important",
    backgroundColor: "#69B4AC",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    "&:hover": {
      backgroundColor: "#8CE0D7",
    },
    "&:disabled": {
      backgroundColor: "rgb(123,123,123)",
    },
  },
  rightSideBackground: {
    backgroundColor: (theme) =>
      theme === 1 ? "rgb(122,178,172)" : "rgb(158,222,215)",
  },
  shortInputBox: {
    margin: "0.5rem 0.1rem 0.5rem 0.1rem",
    width: "22.5ch",
  },
  mediumInputBox: {
    margin: "0.5rem 0.1rem 0.5rem 0.1rem",
    width: "calc( 1.3rem + 45ch )",
  },
}));
export const LoginPopup = (props) => {
  const {
    UI: { theme },
    closePopupFunction,
    loadingBarFunction,
  } = props;
  const classes = useStyles(theme);
  const [showProgress, setShowProgress] = useState(false);
  const [loginAllowed, setLoginAllowed] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [typingAllowed, setTypingAllowed] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const onTextChange = () => {
    if (loginFailed) {
      setLoginFailed(false);
    }
    const [email, password] = [
      document.getElementById("email")?.value,
      document.getElementById("password")?.value,
    ];

    if (email && password) {
      setLoginAllowed(true);
    } else {
      setLoginAllowed(false);
    }
  };
  const login = () => {
    const [email, password] = [
      document.getElementById("email")?.value,
      document.getElementById("password")?.value,
    ];

    if (email && password) {
      setLoginAllowed(false);
      setTypingAllowed(false);
      loadingBarFunction && loadingBarFunction(true);
      let resp;
      axios
        .post(`${hwbountyAPI}/login`, {
          email,
          password,
        })
        .then((response) => {
          const { token } = response.data;
          if (response.data.complete) {
            setAuthorizationHeader(response.data.token);
            window.location.reload();
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            setLoginFailed(true);
            setTypingAllowed(true);
          }
        })
        .then(() => {
          loadingBarFunction && loadingBarFunction(false);
        });
    }
  };
  useEffect(() => {
    return () => {
      localStorage.removeItem("signupStep1Data");
    };
  }, []);
  const history = useHistory();
  // const handle

  if (localStorage.getItem("DBIdToken")) history.push("/");
  return (
    <div
      style={{
        height: "39rem",
        width: "31rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "4ch",
      }}
      onKeyDown={(key) =>
        key.code === "Enter" && document.getElementById("loginButton").click()
      }
    >
      {showProgress && <LinearProgress />}
      <img
        src="https://raw.githubusercontent.com/HWBounty/HWBountyAssets/2a379c8357790b232ac7b17b7de2587d4967a0a1/HopperEyes.svg"
        style={{ width: "7.5rem", borderRadius: "10000ch" }}
      />
      <Typography className={`${classes.hwbountyTitle}`}>
        {t("loginPopup.signIn")}
      </Typography>
      <Typography className={`${classes.subText}`}>
        {t("loginPopup.useHWBounty")}
      </Typography>
      <br />
      <br />
      <TextField
        label="Email Address"
        variant="outlined"
        fullWidth
        onChange={onTextChange}
        id="email"
        error={!!loginFailed}
        helperText={loginFailed && "Invalid email or password"}
        disabled={!typingAllowed}
      />
      <span style={{ marginTop: "1.25rem" }} />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        type={showPassword ? "all" : "password"}
        onChange={onTextChange}
        id="password"
        error={!!loginFailed}
        helperText={loginFailed && "Invalid email or password"}
        disabled={!typingAllowed}
      />
      <span
        style={{
          width: "100%",
        }}
      >
        <Button
          className={`${classes.secondaryOptionButton} ${classes.disableHoverEffect}`}
          disabled
        >
          {t("loginPopup.forgotPassword")}
        </Button>
      </span>
      <br />
      <br />
      <span
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            className={`${classes.secondaryOptionButton}`}
            onClick={() =>
              closePopupFunction &&
              closePopupFunction(false) &&
              true &&
              (() => {
                window.location.href = `${window.location.origin}/signup`;
              })()
            }
          >
            {t("loginPopup.dontHaveAnAccount")}
          </Button>
        </div>

        <Button
          className={`${classes.primaryOptionButton}`}
          disabled={!loginAllowed}
          onClick={login}
          id="loginButton"
        >
          {t("loginPopup.login")}
        </Button>
      </span>
    </div>
  );
};
const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps)(LoginPopup);
