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
    "min-height": "6vh",
  },
});

const ZoomLinksCollection = (props) => {
  const classes = useButtonStyles();
  const { name, links, color } = props;
  return (
    <div>
      <Card className={classes.button} style={{ background: color }}>
        <Typography variant="h5" display="block">
          {name}
        </Typography>
        {(() => {
          let allLinks = [];
          links.map((x) => {
            x.links.map((link) => {
              allLinks.push(
                <Link display="block" href={link}>
                  {x.title}
                  <br />
                </Link>
              );
            });
          });
          return React.Children.toArray(allLinks);
        })()}
        <Typography align="left">{name}</Typography>
      </Card>
    </div>
  );
};
const colors = [
  "rgb(255,149,128)",
  "rgb(255,204,153)",
  "rgb(255,255,153)",
  "rgb(204,255,153)",
  "rgb(204,247,255)",
  "rgb(204,212,255)",
  "rgb(238,204,255)",
];
class ZoomLinksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomLinks: null,
    };
  }
  async fetchZoomLinks() {
    let res = await axios.get("https://api.hwbounty.help/sgy/getZoomLinks").catch(console.trace);
    if (res.status == 200) {
      localStorage.setItem("zoomLinks", JSON.stringify(res.data));
      this.setState({ zoomLinks: res.data });
    } else this.setState({ zoomLinks: res.status });
  }
  componentDidMount(){
    this.fetchZoomLinks();
  }
  render() {
    if (!this.state.zoomLinks && !localStorage.getItem("zoomLinks")) {
      return <Typography variant="h4">Fetching Zoom Links</Typography>;
    }
    if (!this.state.zoomLinks && localStorage.getItem("zoomLinks")) {
      this.state = { zoomLinks: JSON.parse(localStorage.getItem("zoomLinks")) };
    }
    if (Math.floor(this.state.zoomLinks / 100) === 4) {
      return <Typography variant="h4">Schoology Not Linked!</Typography>;
    }
    return (
      <div>
        {React.Children.toArray(
          this.state.zoomLinks
            .filter((x) => x.links.length)
            .map((p, i) => {
              return (
                <ZoomLinksCollection
                  name={p.course_name}
                  links={p.links}
                  color={colors[i]}
                />
              );
            })
        )}
      </div>
    );
  }
}

export default ZoomLinksPage;
