// React
import React, { Suspense, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import store from "./redux/store";
import { hwbountyAPI, SET_AUTHENTICATED, SET_THEME } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import { updateSchedule } from "./redux/actions/dataActions";

// Styling
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles/";
import themeFile from "./util/theme";

// Keybinds
import { ShortcutProvider, ShortcutConsumer } from "react-keybind";
import KeybindManager from "./util/keybinds/keybind";

// Components
import AuthPopup from "./components/User/Authentication/AuthPopup";
import Sidebar from "./components/Sidebar";

// Tools
import { SnackbarProvider } from "notistack";
import axios from "axios";
import LoadingPage from "./pages/loadingPage";
import { GainCoins } from "./components/Modules/GainCoins";
import ErrorBoundary from "./components/ErrorBoundary";
import Routes from "./Routes";
import AddToHomePage from "./AddToHomePage";

//=================Checks on App start====================//
const token = localStorage.DBIdToken;
if (token) {
  axios.defaults.headers.common["Authorization"] = token;

  store.dispatch({ type: SET_AUTHENTICATED });
  store.dispatch(getUserData());
  store.dispatch(updateSchedule());
}
if (localStorage.anonStorage) {
  store.dispatch(updateSchedule());
}

let themeCache = -1;
const result = window.matchMedia("(prefers-color-scheme: dark)");
if (localStorage.theme === "0") themeCache = 0;
if (localStorage.theme === "1") themeCache = 1;
if (themeCache === -1) themeCache = result.matches ? 1 : 0;
if (themeCache !== null) {
  store.dispatch({ type: SET_THEME, payload: themeCache });
}
//========================================================//

const App = (props) => {
  const {
    UI: { theme },
    user: { authenticated },
  } = props;

  const dynamicTheme = createMuiTheme({
    ...themeFile,
    palette: {
      primary: {
        ...themeFile.palette.primary,
      },
      secondary: {
        ...themeFile.palette.secondary,
      },
      type: theme === 0 ? "light" : "dark",
      text: {
        primary: (theme === 0 ? "rgba(0,0,0,0.87)" : "#fff"),
      }
    },
    props: {
      MuiTypography: {
        color: "textPrimary"
      }
    }
  });
  if (localStorage.getItem("vanityInvite")) {
    let vaninv = localStorage.getItem("vanityInvite");
    localStorage.removeItem("vanityInvite");
    (async () => {
      await axios
        .post(`${hwbountyAPI}/redeemInvite`, {
          invite: vaninv,
        })
        .catch(console.error);
    })();
  }
  document.body.style.backgroundColor = theme === 1 ? "rgb(48,48,48)" : "rgb(244,247,251)"
  return (
    <SnackbarProvider maxSnack={5}>
      <ShortcutProvider ignoreTagNames={["input", "textarea"]}>
        <MuiThemeProvider theme={dynamicTheme}>
          <CssBaseline />
          <KeybindManager />
          <GainCoins />
          {["iPhone", "iPad", "iPod"].includes(navigator.platform) && !localStorage.installDismissed && <AddToHomePage />}
          <div className="App">
            <Router>
              <video
                src="https://github.com/HWBounty/HWBountyAssets/blob/main/frog2.mov?raw=true"
                style={{
                  display: "none",
                }}
              />
              <Suspense fallback={<LoadingPage />}>
                {<Sidebar />}
                <AuthPopup />
                {!authenticated && (
                  <div>
                    <div
                      id="g_id_onload"
                      data-client_id="160671237729-g24u8hcgp9ikj6ngks845j9rhh0cu7cq.apps.googleusercontent.com"
                      data-context="signup"
                      data-ux_mode="popup"
                      data-callback="googleAuth"
                      data-auto_select="true"
                      data-close_on_tap_outside="false"
                    ></div>
                    <div
                      class="g_id_signin"
                      data-type="icon"
                      data-shape="circle"
                      data-theme="filled_black"
                      data-text="signin"
                      data-size="large"
                      id="googleAuthButton"
                      style={{
                        display: "none",
                      }}
                    ></div>
                  </div>
                )}
                <ErrorBoundary>
                  <Routes />
                </ErrorBoundary>
              </Suspense>
            </Router>
          </div>
        </MuiThemeProvider>
      </ShortcutProvider>
    </SnackbarProvider>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps)(App);
