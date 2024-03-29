// React
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// MUI
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

// Redux
import { connect } from 'react-redux';
import {
  calc_addHistory,
  calc_setInput,
} from '../../../redux/actions/moduleActions';

// Components
import History from './History';

// Math related
import mathquillToMathJS from '../../../util/latex/preprocessMathQuill';
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill';
import { NumPad, SymbolPad } from './CalcTools';
import * as math from 'mathjs';

// required for latex to format correctly
addStyles();

const useStyles = makeStyles((theme) => ({
  ...theme.spreadIt,
  paper: {
    ...theme.spreadIt.paper,
    height: '80vh',
  },
  rootPadding: {
    ...theme.spreadIt.rootPadding,
    flexDirection: 'column',
    display: 'flex',
    height: '100%',
  },
  symbolPadGrid: {
    paddingTop: 15,
  },
}));

const LatexInput = (props) => {
  const { onChange, onSubmit, mathquillDidMount } = props;

  return (
    <EditableMathField
      latex=""
      style={{ height: 'auto', fontSize: 50, flex: 1 }}
      config={{
        autoCommands: 'pi theta sqrt sum',
        autoOperatorNames:
          'sin cos tan feet ft inches in miles cm sech arcsec arsinh to rad deg radians degrees',
        handlers: {
          enter: onSubmit,
        },
      }}
      onChange={onChange}
      mathquillDidMount={mathquillDidMount}
    />
  );
};

export const Calculator = (props) => {
  const {
    module: {
      calculator: { input },
    },
    calc_addHistory,
    calc_setInput,
    scope,
  } = props;

  const classes = useStyles();

  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  const mathField = useRef(null);

  const handleSubmit = (val) => {
    try {
      const node = math.parse(mathquillToMathJS(val.latex()));
      const compiled = node.compile();
      let ans = compiled.evaluate(scope);
      ans = math.format(ans, { precision: 14 });

      setAnswer(`${ans}`);
      setError(false);
      calc_addHistory({ latex: val.latex(), ans: `${ans}` });
      mathField.current.latex('');
    } catch (err) {
      console.log(err);
      setAnswer('ERROR!!!!');
      setError(true);
    }
  };

  const handleMathquillMount = (val) => {
    mathField.current = val;
  };

  const handleNumberPressed = (num) => {
    mathField.current.write(num);
    mathField.current.focus();
  };

  const handleSymbolPressed = (symbol) => {
    mathField.current.cmd(symbol);
    mathField.current.focus();
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.rootPadding}>
        <History />
        <InputBase
          inputComponent={LatexInput}
          inputProps={{
            onSubmit: handleSubmit,
            //onChange: handleChange,
            mathquillDidMount: handleMathquillMount,
          }}
          /*className={classes.input}*/
          value=""
          fullWidth
        />
        <Grid container spacing={2} className={classes.symbolPadGrid}>
          <Grid item xs>
            <NumPad onClick={handleNumberPressed} />
          </Grid>
          <Grid item xs>
            <SymbolPad onClick={handleSymbolPressed} />
          </Grid>
        </Grid>
        <Typography color={error ? 'error' : 'initial'}>{answer}</Typography>
      </div>
    </Paper>
  );
};

Calculator.propTypes = {
  scope: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  module: state.module,
});

export default connect(mapStateToProps, { calc_addHistory, calc_setInput })(
  Calculator
);
