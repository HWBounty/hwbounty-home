// React
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styling
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles/";
import themeFile from "./util/theme";

// Pages
import Home from "./pages/home";

const theme = createMuiTheme(themeFile);

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
