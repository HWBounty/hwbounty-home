// React
import React, { Component } from "react";

// MUI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useButtonStyles = makeStyles({
  button: {
    //background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    //boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    marginTop: 10,
    display: "block",
  },
});

const PeriodButton = (props) => {
  const classes = useButtonStyles();
  const { period, name, zoom, color } = props;

  const [expanded, setExpanded] = React.useState(false);
  const handleButtonClicked = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Button
        className={classes.button}
        onClick={handleButtonClicked}
        variant="contained"
        fullWidth
        style={{ background: color }}
      >
        <Typography variant="h5" display="block">
          Period {period}
        </Typography>
        <Typography align="left">{name}</Typography>
        <Collapse in={expanded}>Thisis expandeddd</Collapse>
      </Button>
    </div>
  );
};

export const Schedule = (props) => {
  const periods = [
    {
      period: 1,
      name: "GeoH",
      zoom: "https://example.com" /*add all necessary components*/,
      color: "rgb(255,149,128)",
    },
    {
      period: 2,
      name: "Bio",
      zoom: "https://example.com" /*add all necessary components*/,
      color: "rgb(255,204,153)",
    },
    {
      period: 3,
      name: "Spanish",
      zoom: "https://example.com" /*add all necessary components*/,
      color: "rgb(255,255,153)",
    },
    {
      period: 4,
      name: "Business",
      zoom: "https://example.com" /*add all necessary components*/,
      color: "rgb(204,255,153)",
    },
    {
      period: 5,
      name: "English",
      zoom: "https://example.com" /*add all necessary components*/,
      color: "rgb(204,247,255)",
    },
    {
      period: 6,
      name: "History",
      zoom: "https://example.com" /*add all necessary components*/,
      color: "rgb(204,212,255)",
    },
    {
      period: 7,
      name: "PE",
      zoom: "https://example.com" /*add all necessary components*/,
      color: "rgb(238,204,255)",
    },
  ];

  return (
    <div>
      {React.Children.toArray(
        periods.map((p) => {
          return (
            <PeriodButton
              period={p.period}
              name={p.name}
              zoom={p.zoom}
              color={p.color}
            />
          );
        })
      )}
    </div>
  );
};

export default Schedule;
