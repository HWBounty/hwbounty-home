// React
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';

// MUI
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLessRounded';
import ExpandMore from '@material-ui/icons/ExpandMoreRounded';
import withStyles from '@material-ui/core/styles/withStyles';

// Components
import SchoologyAssignment from './SchoologyAssignment';

import dayjs from 'dayjs';

const styles = (theme) => ({
  dateButton: {
    width: '100%',
    textTransform: 'none',
  },
  dateText: {},
});

export const AssignmentsGroup = (props) => {
  // load each assignment with matching date from redux state
  const [expanded, setExpanded] = useState(true);
  const { date, assignments, classes } = props;

  return (
    <div>
      <Button
        className={classes.dateButton}
        endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
        onClick={() => setExpanded(!expanded)}
      >
        <Typography fontWeight="fontWeightBold">
          {dayjs(date).format('dddd, MMM DD YYYY')}
        </Typography>
      </Button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {React.Children.toArray(
          assignments.map((a) => {
            return (
              <SchoologyAssignment title={a.title} url={a.url} due={a.due} />
            );
          })
        )}
      </Collapse>
    </div>
  );
};

AssignmentsGroup.propTypes = {
  date: PropTypes.string.isRequired,
  assignments: PropTypes.array.isRequired,
};

export default withStyles(styles)(AssignmentsGroup);
