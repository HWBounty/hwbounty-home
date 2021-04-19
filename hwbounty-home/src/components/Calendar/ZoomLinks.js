// React
import React, { Component } from "react";

// MUI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "axios";
import { Card } from "@material-ui/core";
import { Link } from "react-router-dom";

const useButtonStyles = makeStyles({
  card: {
    background: "linear-gradient(45deg, #a7acd9 30%, #9e8fb2 90%)",
    border: 0,
    borderRadius: 10,
    margin: "5%",
    display: "block",
    width: "90%",
    "min-height": "6vh"
  },
});

const ZoomLinksCollection = (props) => {
  const classes = useButtonStyles();
  const { name, links, color } = props;

  // const [expanded, setExpanded] = React.useState(false);
  // const handleButtonClicked = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <div>
      <Card
        className={classes.button}
        variant="contained"
        style={{ background: color }}
      >
        <Typography variant="h5" display="block">
          {name}
        </Typography>
        {
          (() => {
            let allLinks = [];
            links.map(x => {
              x.links.map(link => {
                allLinks.push(
                  <Link display="block" href={link}>
                    {x.title}<br />
                  </Link>
                )
              })

            })
            return React.Children.toArray(allLinks);
          })()
        }
        <Typography align="left">{name}</Typography>
      </Card>
    </div>
  );
};
// {
//   "course_name": "APCompSci A",
//   "links": [
//       {
//           "title": "Paley&#039;s Zoom Office Hours (anyone welcome)",
//           "links": [
//               "https://pausd.zoom.us/j/2680427016"
//           ]
//       },
//       {
//           "title": "Period 2 Zoom Link - AP CSA (Mr. Bautista)",
//           "links": [
//               "https://pausd.zoom.us/j/98997767306?pwd=Mzc4NFdkWEViNDF3REdzOEJtOVhldz09"
//           ]
//       },
//       {
//           "title": "Bautista Office Hours",
//           "links": [
//               "https://pausd.zoom.us/j/94007598185?pwd=RzRTdVhqdmdoVGV6Q2lVdlRKQ1Bydz09"
//           ]
//       }
//   ]
// },
const colors = ["rgb(255,149,128)", "rgb(255,204,153)", "rgb(255,255,153)", "rgb(204,255,153)", "rgb(204,247,255)", "rgb(204,212,255)", "rgb(238,204,255)"];
class ZoomLinksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomLinks: null
    };

  }
  async fetchZoomLinks() {
    let res = await axios.get("https://api.hwbounty.help/sgy/getZoomLinks");
    if (res.status == 200) {
      localStorage.setItem("zoomLinks",JSON.stringify(res.data));
      this.setState({ zoomLinks: res.data });
    }
    else this.setState({ zoomLinks: res.status });
  }
  render() {
    if (!this.state.zoomLinks && !localStorage.getItem("zoomLinks")) {
      this.fetchZoomLinks();
      return (
        <Typography variant="h4">Fetching Zoom Links</Typography>
      );
    }
    if (!this.state.zoomLinks && localStorage.getItem("zoomLinks")){
      this.state = ({ zoomLinks: JSON.parse(localStorage.getItem("zoomLinks")) });
    }
    if (Math.floor(this.state.zoomLinks / 100) === 4) {
      return (
        <Typography variant="h4">Schoology Not Linked!</Typography>
      );
    }
    return (
      <div>
        {React.Children.toArray(
          this.state.zoomLinks.filter(x => x.links.length).map((p, i) => {
            return <ZoomLinksCollection name={p.course_name} links={p.links} color={colors[i]} />;
          })
        )}
      </div>
    );
  }
}
export const ZoomLinks = (props) => {
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


};

export default ZoomLinksPage;
