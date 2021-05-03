// React
import React, { useEffect, useRef } from "react";
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

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import newSignup from "./pages/newSignup";
import Profile from "./pages/profile";
import signupCallback from "./pages/signupCallback";
import Settings from "./pages/settings";
import home from "./pages/home";
import ScheduleInfo from "./pages/ScheduleInfo";
import johnsHome from "./pages/johnsHome";
import ScheduleCatalog from "./pages/schedules";
import viewSchedule from "./pages/viewSchedule";
import setSchedule from "./pages/setSchedule";
import schoologyOauthRedirect from "./pages/schoologyOauthRedirect";

// Components
import Navbar from "./components/Home/Navbar";
import AuthPopup from "./components/User/Authentication/AuthPopup";
import Sidebar from "./components/Sidebar";
import MusicModule from "./components/MusicModule/MusicModule";
import ModuleViewer from "./components/Modules/ModuleViewer";

// Tools
import axios from "axios";
import queryString from "query-string";
import LoadIntoCache from "./LoadIntoCache";

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
if (themeCache) {
  store.dispatch({ type: SET_THEME, payload: themeCache });
}
//========================================================//

const App = (props) => {
  const {
    UI: { theme },
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
              {localStorage.getItem("DBIdToken") ? <Sidebar /> : <Navbar />}

              <AuthPopup />
              <MusicModule />
              <LoadIntoCache />

              <Switch>
                <Route exact path="/" component={home} />
                <Route
                  exact
                  path="/schoologyCallback"
                  component={schoologyOauthRedirect}
                />
                <Route path="/signupcallback" component={signupCallback} />
                {/* <Route path="/jHome" component={Home}/> */}
                <Route path="/test" component={null} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={newSignup} />
                <Route path="/schedules" component={ScheduleCatalog} />
                <Route exact path="/schedule" component={ScheduleInfo} />
                <Route path="/schedule/view" component={viewSchedule} />
                <Route path="/schedule/set" component={setSchedule} />
                <Route path="/modules/" component={ModuleViewer} />
                <Route path="/user/" component={Profile} />
                <Route path="/settings/" component={Settings} />
              </Switch>
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
