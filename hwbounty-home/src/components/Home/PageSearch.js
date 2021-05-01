// React
import React, { useState } from "react";

// MUI
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

// MUI Treasury
import {
  Button,
  Container,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

import Fuse from "fuse.js";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
/*
TODO: remove mui theme provider here, it should work without it!!!
(maybe check pallete or something?, color is sent but dark mode is not)
*/
const styles = (theme) => ({
  ...theme.spreadIt,
});

const pageArray = [
  {
    name: "Home",
    path: "/",
    description: "The main page with scheduling and more!",
  },
  {
    name: "Schedules",
    path: "/schedules",
    description: "Find the perfect schedule for you!",
  },
  {
    name: "Ideal Gas Calculator",
    path: "/module/gaslawscalc",
    description: "Gas Law Calculator PV=NRT (Chemistry)",
  },
  {
    name: "Schedule",
    path: "/schedule",
    description:
      "Your current schedule, with a clock, zoom links, and periods!",
  },
];
const fuseOptions = {
  includeScore: true,
  // Search in `author` and in `tags` array
  keys: ["name", "description"],
};
const fuse = new Fuse(pageArray, fuseOptions);
export const PageSearch = (props) => {
  const history = useHistory();
  const {
    UI: { theme },
  } = props;
  const [query, setQuery] = useState("");
  const swapPage = (path) => {
    setQuery("");
    history.push(path);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  const renderResults = () => {
    return React.Children.toArray(
      fuse
        .search(query)
        .filter((x, i) => i < 3)
        .map((result) => {
          return (
            <ListItem
              align="left"
              style={{
                minWidth: 396,
                margin: 0,
                padding: 0,
                textAlign: "left",
              }}
            >
              <Button fullWidth onClick={(x) => swapPage(result.item.path)}>
                <Typography
                  variant="h5"
                  style={{
                    fontSize: 20,
                    fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
                    marginLeft: 0,
                    marginRight: 40,
                    top: 0,
                    left: 10,
                    fontWeight: 700,
                    lineHeight: 1.235,
                  }}
                  align="left"
                >
                  {result.item.name}
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    fontSize: 16,
                    fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
                    textAlign: "right",
                    marginLeft: 40,
                    display: "block",
                    position: "relative",
                  }}
                >
                  {result.item.description.substring(0, 25)}
                </Typography>
              </Button>
            </ListItem>
          );
        })
    );
  };
  let pageOptions = renderResults();
  return (
    <Container
      maxWidth="xs"
      style={{
        margin: 0,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder="Go To Page"
            onChange={handleChange}
            value={query}
            fullWidth
            {...props}
            style={{
              color: theme ? "white" : "black",
            }}
          />
        </form>
      </MuiThemeProvider>
      {pageOptions.length ? (
        <Paper
          style={{
            minWidth: 396,
            height: 160,
            position: "absolute",
            top: 50,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <List
            style={{
              minWidth: 396,
              height: 440,
              overflowX: "hidden",
              overflowY: "scroll",
              scrollbarWidth: "none",
              position: "absolute",
              padding: 0,
              margin: 0,
            }}
          >
            {pageOptions}
          </List>
        </Paper>
      ) : null}
    </Container>
  );
};

export default connect((state) => ({ UI: state.UI }))(
  withStyles(styles)(PageSearch)
);
