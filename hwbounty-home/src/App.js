// React
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// Styling
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles/";
import themeFile from "./util/theme";

// Pages
import Home from "./pages/home";

import Navbar from "./components/Navbar";

const secretTheme = createMuiTheme(themeFile);

const App = (props) => {
  const { theme } = props.UI;

  const dynamicTheme = createMuiTheme({
    ...themeFile,
    palette: {
      type: theme === 0 ? "light" : "dark",
    },
  });

  return (
    <MuiThemeProvider theme={dynamicTheme}>
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
