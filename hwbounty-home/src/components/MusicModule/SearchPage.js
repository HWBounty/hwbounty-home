import React, { useState } from "react";

import {
  Button,
  Container,
  InputBase,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";

import Player from "./Player";

let parseSecsToEnglish = (secs) => {
  let mins = Math.floor(secs / 60);
  let sec = Math.round(secs - mins * 60);
  mins = Math.round(secs / 60);
  mins = `${mins}`.length == 1 ? `0${mins}` : mins;
  sec = `${sec}`.length == 1 ? `0${sec}` : sec;
  return `${mins}:${sec}`;
};
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const SearchMusic = (props) => {
  const [query, setQuery] = useState("");
  const [updateView, setUpdateView] = useState(null);
  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  const updateWhenChanged = async () => {
    while (Player.self.searchResults === updateView) await sleep(20);
    setUpdateView(Player.self.searchResults);
  };
  const search = (e) => {
    Player.self.search(query);
    e.preventDefault();
    return false;
  };
  const addToQueue = (link) => {
    Player.self.addToQueue(link);
    Player.self.searchResults = null;
    setUpdateView(null);
  };
  return (
    <div>
      <Container maxWidth="xs">
        <form onSubmit={search}>
          <InputBase
            placeholder="Search Songs"
            onChange={handleChange}
            value={query}
            fullWidth
            {...props}
          />
        </form>
      </Container>
      <List
        style={{
          minWidth: 300,
          height: 440,
          padding: 0,
          margin: 0,
          overflowX: "hidden",
          overflowY: "scroll",
          scrollbarWidth: "none",
        }}
      >
        {Player.self.searchResults
          ? React.Children.toArray(
              Player.self.searchResults.map((data, i) => {
                return (
                  <ListItem>
                    <Button onClick={(x) => addToQueue(data?.link)}>
                      <div
                        style={{
                          background: `url(${
                            data?.thumbnail || ""
                          })center/cover`,
                          minHeight: "64px",
                          minWidth: "64px",
                          maxHeight: "128px",
                          maxWidth: "128px",
                          borderRadius: "2px",
                        }}
                      />
                      <Typography
                        variant="caption"
                        style={{
                          marginLeft: "1vw",
                        }}
                      >
                        {`${
                          data?.name.substring(0, 25) || data.link
                        } ${" ".repeat(30)}`.substring(0, 25)}
                      </Typography>
                      <Typography
                        variant="h6"
                        style={{
                          display: "inline-block",
                          marginLeft: "1vw",
                        }}
                      >
                        {data.duration}
                      </Typography>
                    </Button>
                  </ListItem>
                );
              })
            )
          : null}
      </List>
    </div>
  );
};
export default SearchMusic;
