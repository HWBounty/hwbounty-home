// React
import React, { Component } from "react";

// MUI
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useButtonStyles = makeStyles({
  root: {
    //background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    //boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    marginTop: 10,
    paddingBottom: 10,
    display: "block",
    cursor: "pointer",
  },
});

const PeriodButton = (props) => {
  const classes = useButtonStyles();
  const { period, name, zoom, color } = props;

  const [expanded, setExpanded] = React.useState(false);
  const handleButtonClicked = () => {
    setExpanded(!expanded);
  };

  const handleZoomLinkClicked = (event, link) => {
    event.stopPropagation();
    const newWindow = window.open(link, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div>
      <Card
        className={classes.root}
        onClick={handleButtonClicked}
        style={{ background: color }}
      >
        <Typography variant="h5" display="block">
          Period {period}
        </Typography>
        <Typography align="left">{name}</Typography>
        <Collapse in={expanded}>
          {React.Children.toArray(
            zoom.map((z) => {
              return (
                <Button onClick={(e) => handleZoomLinkClicked(e, z.link)}>
                  {z.title}
                </Button>
              );
            })
          )}
        </Collapse>
      </Card>
    </div>
  );
};

export const Schedule = (props) => {
  const periods = [
    {
      period: 1,
      name: "GeoH",
      color: "rgb(255,149,128)",
      zoom: [
        { link: "https://example.com", title: "Office hours" },
        { link: "https://google.com", title: "GeoH 1st period Zoom Link" },
      ],
    },
    {
      period: 2,
      name: "Bio",
      color: "rgb(255,204,153)",
      zoom: [
        { link: "https://example.com", title: "Office hours" },
        { link: "https://google.com", title: "GeoH 1st period Zoom Link" },
      ],
    },
    {
      period: 3,
      name: "Spanish",
      color: "rgb(255,255,153)",
      zoom: [
        { link: "https://example.com", title: "Office hours" },
        { link: "https://google.com", title: "GeoH 1st period Zoom Link" },
      ],
    },
    {
      period: 4,
      name: "Business",
      color: "rgb(204,255,153)",
      zoom: [
        { link: "https://example.com", title: "Office hours" },
        { link: "https://google.com", title: "GeoH 1st period Zoom Link" },
      ],
    },
    {
      period: 5,
      name: "English",
      color: "rgb(204,247,255)",
      zoom: [
        { link: "https://example.com", title: "Office hours" },
        { link: "https://google.com", title: "GeoH 1st period Zoom Link" },
      ],
    },
    {
      period: 6,
      name: "History",
      color: "rgb(204,212,255)",
      zoom: [
        { link: "https://example.com", title: "Office hours" },
        { link: "https://google.com", title: "GeoH 1st period Zoom Link" },
      ],
    },
    {
      period: 7,
      name: "PE",
      color: "rgb(238,204,255)",
      zoom: [
        { link: "https://example.com", title: "Office hours" },
        { link: "https://google.com", title: "GeoH 1st period Zoom Link" },
      ],
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
