// React
import { Fragment } from "react";
import PropTypes from "prop-types";

// MUI
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import dayjs from "dayjs";

const styles = {
  typography: {
    textTransform: "none",
  },
  assignmentTitle: {
    flex: 1,
    textAlign: "left",
    marginLeft: 10,
    textTransform: "none",
  },
  assignmentDue: {
    marginRight: 10,
    //textTransform: "none",
  },
};

export const SchoologyAssignment = (props) => {
  const { url, title, due, classes } = props;

  const openLinkInNewTab = () => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Button onClick={openLinkInNewTab} fullWidth>
      <Typography color="inherit" className={classes.assignmentTitle}>
        {title}
      </Typography>
      <Typography className={classes.assignmentDue}>
        {dayjs(due).format("h:mm a")}
      </Typography>
    </Button>
  );
};

SchoologyAssignment.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  due: PropTypes.string.isRequired,
};

export default withStyles(styles)(SchoologyAssignment);
