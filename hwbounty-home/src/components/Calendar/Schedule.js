// React
import React, { Component } from "react";

// MUI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useButtonStyles = makeStyles({
  button: {
    background: "linear-gradient(45deg, #a7acd9 30%, #9e8fb2 90%)",
    border: 0,
    borderRadius: 10,
    margin: "5%",
    display: "block",
    width:"90%",
    "min-height": "6vh"
  },
});

const PeriodButton = (props) => {
  const classes = useButtonStyles();
  const { period, name, zoom ,color} = props;

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
        style={{background : color}}
      >
        <Typography variant="h5" display="block">
          Period {period}
        </Typography>
        <Typography align="left">{name}</Typography>
        <Collapse in={expanded}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus posuere pretium mauris, quis dictum enim bibendum pretium. Phasellus elementum elit at lorem dignissim finibus. In commodo, urna vel porta efficitur, mi turpis dapibus lorem, ac bibendum ante sem a ipsum. Donec egestas odio non lacus facilisis tristique. Morbi eget pulvinar massa. Proin sit amet maximus eros. Sed sodales nunc in diam volutpat, in elementum mi condimentum. Pellentesque sed lacinia lectus, nec rhoncus orci. Morbi quis nunc aliquet mi aliquam pharetra. Pellentesque erat erat, cursus sit amet pharetra sed, feugiat fermentum augue. Suspendisse congue commodo magna eu lacinia. Nunc vitae eros vel mi condimentum venenatis nec vel orci. Cras gravida suscipit sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

</Collapse>
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
          return <PeriodButton period={p.period} name={p.name} zoom={p.zoom} color={p.color}/>;
        })
      )}
    </div>
  );
};

export default Schedule;
