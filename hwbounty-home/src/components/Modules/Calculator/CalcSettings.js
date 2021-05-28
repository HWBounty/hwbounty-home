// React
import { useState, useEffect, useRef } from "react";

// MUI
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import withStyles from "@material-ui/core/styles/withStyles";

// Redux
import { connect } from "react-redux";
import {
  calc_addVariable,
  calc_removeVariable,
} from "../../../redux/actions/moduleActions";

const styles = (theme) => ({
  ...theme.spreadIt,
  paper: {
    ...theme.spreadIt.paper,
    height: "80vh",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  },
  variableWrapper: {
    flex: 1,
  },
});

export const CalcSettings = (props) => {
  const {
    classes,
    parser,
    module: {
      calculator: { variables },
    },
    calc_addVariable,
    calc_removeVariable,
  } = props;

  const VariableField = (props) => {
    const { name, startVal } = props;

    const [disabled, setDisabled] = useState(true);
    const [value, setValue] = useState(startVal);

    const inputRef = useRef(null);

    useEffect(() => {
      if (disabled) return;
      inputRef.current.focus();
      inputRef.current.select();
    }, [disabled]);

    const handleSubmit = (event) => {
      event.preventDefault();
      setDisabled(true);
      try {
        parser.set(name, value);
      } catch (err) {
        console.log(err);
      }
    };

    const handleClicked = () => {
      setDisabled(false);
    };

    const handleVariableChange = (event) => {
      // change var given name and new val
      setValue(event.target.value);
    };

    return (
      <Button onClick={handleClicked}>
        <Typography variant="body1">{name}</Typography>
        <Typography variant="body1">=</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            disabled={disabled}
            placeholder={value}
            value={value}
            inputRef={inputRef}
            onChange={handleVariableChange}
            onBlur={handleSubmit}
          />
        </form>
      </Button>
    );
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.variableWrapper}>
        {Object.keys(parser.getAll()).map((key) => (
          <VariableField name={key} startVal={parser.get(key)} />
        ))}
      </div>
      <AddIcon />
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  module: state.module,
});

export default connect(mapStateToProps, {
  calc_addVariable,
  calc_removeVariable,
})(withStyles(styles)(CalcSettings));
