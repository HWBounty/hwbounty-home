// React
import PropTypes from "prop-types";
import { useState } from "react";

// MUI
import Button from "@material-ui/core/Button";
import ExpandLess from "@material-ui/icons/ExpandLessRounded";
import ExpandMore from "@material-ui/icons/ExpandMoreRounded";
import withStyles from "@material-ui/core/styles/withStyles";

import dayjs from "dayjs";

const styles = (theme) => ({
  dateButton: {
    width: "100%",
    textTransform: "none",
  },
});

export const AssignmentsGroup = (props) => {
  // load each assignment with matching date from redux state
  const [expanded, setExpanded] = useState(false);
  const { date, assignments, classes } = props;

  return (
    <div>
      <Button
        className={classes.dateButton}
        endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
        onClick={() => setExpanded(!expanded)}
      >
        <h3>{dayjs(date).format("dddd, MMM DD YYYY")}</h3>
      </Button>
    </div>
  );
};

AssignmentsGroup.propTypes = {
  date: PropTypes.string.isRequired,
  assignments: PropTypes.array.isRequired,
};

export default withStyles(styles)(AssignmentsGroup);
