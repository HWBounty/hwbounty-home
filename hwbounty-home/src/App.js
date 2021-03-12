// React
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider, connect } from "react-redux";
import store from "./redux/store";

// Styling
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles/";
import themeFile from "./util/theme";

// Pages
import Home from "./pages/home";

import Navbar from "./components/Navbar";

const lightTheme = createMuiTheme(themeFile);

const darkTheme = createMuiTheme({
  ...themeFile,
  palette: {
    type: "dark",
  },
});

const titanTheme = createMuiTheme({
  ...themeFile,
  todo: {
    //todo
  },
});

const secretTheme = createMuiTheme(themeFile);

const App = (props) => {
  const { theme } = props.UI;

  const getTheme =
    theme == 0
      ? lightTheme
      : theme == 1
      ? darkTheme
      : theme == 2
      ? titanTheme
      : secretTheme;

  return (
    <MuiThemeProvider theme={getTheme}>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps)(App);
