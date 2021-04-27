// React
import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
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

//=================Check for oauth token====================//
const token = localStorage.DBIdToken;
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
  store.dispatch({ type: SET_AUTHENTICATED });
  store.dispatch(getUserData());
}

// Very messy. Me no likey...
// let urlQuery = queryString.parse(window.location.search);
// if (urlQuery.oauth_token) {
//   const DBIdToken = `Bearer ${urlQuery.oauth_token}`;
//   localStorage.setItem("DBIdToken", DBIdToken);
//   axios.defaults.headers.common["Authorization"] = DBIdToken;
//   store.dispatch({ type: SET_AUTHENTICATED });
//   store.dispatch(getUserData());
// }
//==========================================================//

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
    <ShortcutProvider ignoreTagNames={["input", "textarea"]}>
      <MuiThemeProvider theme={dynamicTheme}>
        <CssBaseline />
        <KeybindManager />
        <div className="App">
          <Navbar />
          <AuthPopup />
          <Router>
            <Switch>
              <Route exact path="/" component={johnsHome} />
              <Route path="/betterHome" component={Home} />
              <Route
                exact
                path="/schoologyCallback"
                component={schoologyOauthRedirect}
              />
              {/* <Route path="/jHome" component={Home}/> */}
              <Route path="/test" component={null} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/schedules" component={ScheduleCatalog} />
              <Route path="/schedule/view" component={viewSchedule} />
              <Route path="/schedule/set" component={setSchedule} />
              <Route path="/module/:module" component={null} />
            </Switch>
          </Router>
          <MusicModule />
        </div>
      </MuiThemeProvider>
    </ShortcutProvider>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps)(App);
