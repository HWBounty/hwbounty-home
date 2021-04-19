// React
import React from "react";

// MUI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";

// Components
import Schedule from "./Schedule";
import Assignments from "./Assignments";

const styles = (theme) => ({
  ...theme.spreadIt,
  paper: {
    ...theme.spreadIt.paper,
  },
  content: {
    paddingTop: 10,
    textAlign: "center",
  },
});

const Calendar = (props) => {
  const { classes } = props;

  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Paper className={classes.paper}>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        variant="fullWidth"
      >
        <Tab label="Schedule" />
        <Tab label="Assignments" />
      </Tabs>
      <Container className={classes.content}>
        {tab === 0 && <Schedule />}
        {tab === 1 && <Assignments />}
      </Container>
    </Paper>
  );
};

export default withStyles(styles)(Calendar);
