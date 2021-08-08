import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  InputBase,
  List,
  MuiThemeProvider,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { withRouter } from "react-router-dom";
import t from "../util/localization/localization";

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleData: null,
      fetching: false,
      tab: 0,
    };
  }
  async fetchScheduleData() {
    if (this.state.scheduleData) return;
    const location = this.props.location;
    let id =
      location.pathname.split("/").pop() ||
      location?.state?.query ||
      location.search.split("?id=").pop();
    let res = await axios
      .get(`https://api.hwbounty.help/schedules/view/${id}`)
      .catch(console.trace);
    if (res.data) {
      res.data.nameOverrides = JSON.parse(
        res.data.nameOverrides.replace(/\\"/g, '"')
      );
      res.data.schedule = JSON.parse(res.data.schedule);
      this.setState({ scheduleData: res.data });
    }
  }
  componentDidMount(props) {
    this.props = props;
  }
  handleTabChange(event, newValue, self) {
    self.setState({ tab: newValue });
  }
  render() {
    if (!this.state.scheduleData && !this.state.fetching) {
      this.setState({ fetching: true });
      this.fetchScheduleData();
      return <br />;
    }
    if (this.state.scheduleData) {
      return (
        <Container>
          <Paper
            style={{
              width: "40%",
              maxWidth: "40%",
              margin: "5%",
              display: "inline-block",
              verticalAlign: "middle",
            }}
            align="left"
          >
            <Tabs
              value={this.state.tab}
              indicatorColor="primary"
              textColor="primary"
              onChange={(event, value) => {
                this.handleTabChange(event, value, this);
              }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Mon" />
              <Tab label="Tue" />
              <Tab label="Wed" />
              <Tab label="Thu" />
              <Tab label="Fri" />
              <Tab label="Sat" />
              <Tab label="Sun" />
            </Tabs>
            <List>
              {this.state.tab === 0 && (
                <DisplayedScheduleDay
                  day={this.state.tab}
                  data={this.state.scheduleData}
                />
              )}
              {this.state.tab === 1 && (
                <DisplayedScheduleDay
                  day={this.state.tab}
                  data={this.state.scheduleData}
                />
              )}
              {this.state.tab === 2 && (
                <DisplayedScheduleDay
                  day={this.state.tab}
                  data={this.state.scheduleData}
                />
              )}
              {this.state.tab === 3 && (
                <DisplayedScheduleDay
                  day={this.state.tab}
                  data={this.state.scheduleData}
                />
              )}
              {this.state.tab === 4 && (
                <DisplayedScheduleDay
                  day={this.state.tab}
                  data={this.state.scheduleData}
                />
              )}
              {this.state.tab === 5 && (
                <DisplayedScheduleDay
                  day={this.state.tab}
                  data={this.state.scheduleData}
                />
              )}
              {this.state.tab === 6 && (
                <DisplayedScheduleDay
                  day={this.state.tab}
                  data={this.state.scheduleData}
                />
              )}
            </List>
          </Paper>
          <Card
            style={{
              display: "inline-block",
              width: "40%",
              margin: "5%",
              paddingBottom: "1vh",
              paddingLeft: "5%",
              paddingRight: "5%",
              textAlign: "left",
              verticalAlign: "middle",
            }}
          >
            <Typography
              variant="h4"
              style={{
                textAlign: "center",
              }}
            >
              {this.state.scheduleData.name}
            </Typography>
            <Container
              style={{
                width: "100%",
                height: "10%",
              }}
            >
              <span>
                <Typography
                  variant="caption"
                  style={{
                    textAlign: "left",
                    marginRight: "3%",
                  }}
                >
                  {t("viewSchedule.by")}
                </Typography>
                <Avatar
                  src={this.state.scheduleData.user.pfp}
                  align="left"
                  style={{
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                >
                  {this.state.scheduleData.user.publicID}
                </Avatar>
                <Typography
                  variant="h5"
                  style={{
                    verticalAlign: "middle",
                    marginLeft: "3%",
                    display: "inline-block",
                  }}
                >
                  {this.state.scheduleData.user.publicID}
                </Typography>
              </span>
            </Container>
            <Typography>
              {t("viewSchedule.lastUpdated")}{" "}
              {moment(parseInt(this.state.scheduleData.lastUpdated)).fromNow()}
            </Typography>
            <ReactMarkdown>{this.state.scheduleData.description}</ReactMarkdown>

            <Container
              style={{
                paddingTop: "1vh",
                borderTop: "2px solid rgba(160, 160, 160, 0.2)",
                textAlign: "center",
              }}
            >
              <Button
                onClick={() =>
                  this.props.history.push(
                    `/schedule/set/${this.props.location.pathname
                      .split("/")
                      .pop()}`
                  )
                }
                disabled={
                  !JSON.parse(localStorage.getItem("user") || "[]")
                    ?.schoologyKey
                }
              >
                {JSON.parse(localStorage.getItem("user") || "[]")?.schoologyKey
                  ? "Use this Schedule"
                  : "Link School Account First"}
              </Button>
            </Container>
          </Card>
        </Container>
      );
    }
    return null;
  }
}
const DisplayedScheduleDay = (props) => {
  const classes = props.classes;
  const data = props.data;
  const day = props.day;
  let overrides = data.nameOverrides;
  let dayschedule = data.schedule[
    [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ][day]
  ].map((x) => {
    return Object.assign(x, {
      period: data.nameOverrides[x.period] || x.period,
    });
  });
  const renderPeriods = () => {
    let children = React.Children.toArray(
      dayschedule.map((x) => {
        return (
          <Container>
            <Typography variant="h4">{x.period}</Typography>
            <Typography variant="h6">{x.timeStart}</Typography>
            <Typography variant="h6">{x.timeEnd}</Typography>
          </Container>
        );
      })
    );
    if (!children.length)
      return <Typography variant="h3">{t("viewSchedule.noSchool")}</Typography>;
    return children;
  };
  return (
    <Container
      style={{
        marginBottom: "5%",
      }}
    >
      {renderPeriods()}
    </Container>
  );
};
export default connect()(withRouter(Schedule));
