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
// Components
import Navbar from "./components/Home/Navbar";
import AuthPopup from "./components/User/Authentication/AuthPopup";

// Tools
import axios from "axios";
import queryString from "query-string";
import Signup from "./pages/signup";
import ScheduleCatalog from "./pages/schedules";
import viewSchedule from "./pages/viewSchedule";
import setSchedule from "./pages/setSchedule";
import MusicModule from "./components/MusicModule/MusicModule";
import johnsHome from "./pages/johnsHome";
import schoologyOauthRedirect from "./pages/schoologyOauthRedirect";
import ModuleViewer from "./components/Modules/ModuleViewer";
import ScheduleInfo from "./pages/ScheduleInfo";
import newSignup from "./pages/newSignup";
import Profile from "./pages/profile";
import signupCallback from "./pages/signupCallback";
import LoadIntoCache from "./LoadIntoCache";
import Sidebar from "./components/Sidebar";
import Settings from "./pages/settings";
import home from "./pages/home";

//=================Checks on App start====================//
const token = localStorage.DBIdToken;
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
  store.dispatch({ type: SET_AUTHENTICATED });
  store.dispatch(getUserData());
}

const themeCache = parseInt(localStorage.theme);
if (themeCache) {
  store.dispatch({ type: SET_THEME, payload: themeCache });
}
//========================================================//

const App = (props) => {
  const { theme } = props.UI;

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
              {localStorage.getItem("DBIdToken")? <Sidebar /> : <Navbar />}

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
                <Route path="/module/" component={ModuleViewer} />
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
});

export default connect(mapStateToProps)(App);
