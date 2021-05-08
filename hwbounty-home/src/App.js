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
const schoologyOauthRedirect = lazy(() => import("./pages/schoologyOauthRedirect"));
const PageNotFound = lazy(() => import("./pages/404"));
//=================Checks on App start====================//
const token = localStorage.DBIdToken;
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
  store.dispatch({ type: SET_AUTHENTICATED });
  store.dispatch(getUserData());
}

const themeCache =
  localStorage.theme !== null
    ? parseInt(localStorage.theme)
    : (localStorage.theme = 1);
if (themeCache !== null) {
  store.dispatch({ type: SET_THEME, payload: themeCache });
}
//========================================================//

const App = (props) => {
  const {
    UI: { theme },
    user: { authenticated },
  } = props;
  useEffect(()=>{
    new CalculatorBackend();
  })
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

          <div className="App">
            <Router>
            <Suspense fallback={<div>Loading...</div>}>
              {authenticated ? <Sidebar /> : <Navbar />}

              <AuthPopup />
              {/* <MusicModule /> */}
              <LoadIntoCache />

              <Switch>
                <Route exact path="/" component={home} />
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
                <Route path="/modules/" component={Modules} />
                <Route path="/user/" component={Profile} />
                <Route path="/settings/" component={Settings} />
                <Route exact path = "/login/schoology" component={SchoologyButton} />
                <Route path="*" component={PageNotFound} />
              </Switch>
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
