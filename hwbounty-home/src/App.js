// React
import React, { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";
// Redux
import { connect } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED, SET_THEME } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// Styling
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles/";
import themeFile from "./util/theme";

// Keybinds
import { ShortcutProvider, ShortcutConsumer } from "react-keybind";
import KeybindManager from "./util/keybinds/keybind";

// Components
import Navbar from "./components/Home/Navbar";
import AuthPopup from "./components/User/Authentication/AuthPopup";
import Sidebar from "./components/Sidebar";
import MusicModule from "./components/MusicModule/MusicModule";

// Tools
import axios from "axios";
import queryString from "query-string";
import LoadIntoCache from "./LoadIntoCache";
import { SchoologyButton } from "./components/SchoologyButton";
import CalculatorBackend from "./util/calculator";
import LoadingPage from "./pages/loadingPage";
import { GainCoins } from "./components/Modules/GainCoins";
import ErrorBoundary from "./components/ErrorBoundary";

// Pages
const Modules = lazy(() => import("./pages/modules"));
const newSignup = lazy(() => import("./pages/newSignup"));
const Profile = lazy(() => import("./pages/profile"));
const signupCallback = lazy(() => import("./pages/signupCallback"));
const Settings = lazy(() => import("./pages/settings"));
const home = lazy(() => import("./pages/home"));
const ScheduleInfo = lazy(() => import("./pages/ScheduleInfo"));
const ScheduleCatalog = lazy(() => import("./pages/schedules"));
const viewSchedule = lazy(() => import("./pages/viewSchedule"));
const setSchedule = lazy(() => import("./pages/setSchedule"));
const schoologyOauthRedirect = lazy(() =>
  import("./pages/schoologyOauthRedirect")
);
const LandingPage = lazy(()=> import("./pages/landingPage"));
const PageNotFound = lazy(() => import("./pages/404"));
const newProfile = lazy(()=> import("./pages/newProfile"));
const scheduleBuilder = lazy(()=> import("./pages/scheduleBuilder"))
//=================Checks on App start====================//
const token = localStorage.DBIdToken;
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
  store.dispatch({ type: SET_AUTHENTICATED });
  store.dispatch(getUserData());
}

let themeCache =
  localStorage.theme !== null
    ? parseInt(localStorage.theme)
    : (localStorage.theme = 1);
themeCache = isNaN(themeCache) ? 1 : 0;
if (themeCache !== null) {
  store.dispatch({ type: SET_THEME, payload: themeCache });
}
//========================================================//

const App = (props) => {
  const {
    UI: { theme },
    user: { authenticated },
  } = props;
  useEffect(() => {
    new CalculatorBackend();
  });
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
    },
  });
  return (

    <SnackbarProvider maxSnack={5}>
      <ShortcutProvider ignoreTagNames={["input", "textarea"]}>
        <MuiThemeProvider theme={dynamicTheme}>
          <CssBaseline />
          <KeybindManager />
          <GainCoins />

          <div className="App">
            <Router>
              <video
                src="https://github.com/HWBounty/HWBountyAssets/blob/main/frog2.mov?raw=true"
                style={{
                  display: "none",
                }}
              />
              <Suspense fallback={<div />}>
                {authenticated ? <Sidebar /> : <Navbar />}

                <AuthPopup />
                {/* <MusicModule /> */}
                <LoadIntoCache />
                {!authenticated && (
                  <div
                    id="g_id_onload"
                    data-client_id="160671237729-g24u8hcgp9ikj6ngks845j9rhh0cu7cq.apps.googleusercontent.com"
                    data-context="signin"
                    data-callback="googleAuth"
                    data-auto_select="true"
                    data-close_on_tap_outside="false"
                  ></div>
                )}
                <ErrorBoundary>
                <Switch>
                  <Route path="/dashboard" component={home} />
                  <Route exact path="/" component={authenticated ? home : LandingPage} />
                  <Route
                    exact
                    path="/schoologyCallback"
                    component={schoologyOauthRedirect}
                  />
                  <Route path="/signupcallback" component={signupCallback} />
                  <Route path="/signup" component={newSignup} />
                  <Route path="/schedules" component={ScheduleCatalog} />
                  <Route exact path="/schedule" component={ScheduleInfo} />
                  <Route path="/schedule/view" component={viewSchedule} />
                  <Route path="/schedule/set" component={setSchedule} />
                  <Route path="/schedule/create" component={scheduleBuilder} />
                  <Route path="/modules/" component={Modules} />
                  <Route path="/user/" component={newProfile} />
                  <Route path="/settings/" component={Settings} />
                  <Route path="/loadingPage/" component={LoadingPage} />
                  <Route
                    exact
                    path="/login/schoology"
                    component={SchoologyButton}
                  />
                  <Route path="*" component={PageNotFound} />
                </Switch>
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
