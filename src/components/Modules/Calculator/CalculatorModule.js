// React
import React from 'react';

// MUI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux
import { connect } from 'react-redux';
import { calc_setParser } from '../../../redux/actions/moduleActions';

// Components
import Calculator from './Calculator';
import CalcVariables from './CalcVariables';

// Math
import MathScope from './MathScope';

const scope = new MathScope();
scope.fromJSON();

const styles = (theme) => ({
  ...theme.spreadIt,
  root: {
    margin: 'auto',
  },
});

export const CalculatorModule = (props) => {
  const { classes, calc_setParser } = props;

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <Calculator scope={scope} />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <CalcVariables scope={scope} />
      </Grid>
    </Grid>
  );
};

export default connect(null, { calc_setParser })(
  withStyles(styles)(CalculatorModule)
);
