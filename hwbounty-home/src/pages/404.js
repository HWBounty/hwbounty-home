// React
import React from "react";

// Styling
import { Button, TextField } from "@material-ui/core";

export const PageNotFound = (props) => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <h1> 404 Page not found </h1>
        </p>
        <a className="App-link" href="/">
          <Button variant="outlined">Return to home</Button>
        </a>
      </header>
    </div>
  );
};

export default PageNotFound;
