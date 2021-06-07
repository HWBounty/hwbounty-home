// React
import { useState, useEffect, useRef } from "react";

// MUI
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Popover from "@material-ui/core/Popover";
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
    display: "flex",
    flexDirection: "column",
  },
  variableWrapper: {
    flex: 1,
    overflow: "auto",
    paddingTop: 25,
  },
  addButton: {
    margin: "auto",
    align: "right",
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

  const [popup, setPopupOpen] = useState(false);
  const iconButtonRef = useRef();

  const VariableField = (props) => {
    const { startName, startVal } = props;

    const [nameDisabled, setNameDisabled] = useState(true);
    const [name, setName] = useState(startName);
    const nameInputRef = useRef(null);

    const [valueDisabled, setValueDisabled] = useState(true);
    const [value, setValue] = useState(startVal);
    const valueInputRef = useRef(null);

    useEffect(() => {
      if (nameDisabled) return;
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }, [nameDisabled]);

    useEffect(() => {
      if (valueDisabled) return;
      valueInputRef.current.focus();
      valueInputRef.current.select();
    }, [valueDisabled]);

    const handleSubmit = (event) => {
      event.preventDefault();
      setValueDisabled(true);
      setNameDisabled(true);
      try {
        parser.set(name, value);
        parser.remove(startName);
      } catch (err) {
        console.log(err);
      }
    };

    const handleNameClicked = () => {
      setNameDisabled(false);
    };

    const handleValueClicked = () => {
      setValueDisabled(false);
    };

    const handleVariableChange = (event) => {
      setValue(event.target.value);
    };

    const handleNameChange = (event) => {
      setName(event.target.value);
    };

    return (
      <div style={{ display: "flex" }}>
        <Button onClick={handleNameClicked}>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              size="small"
              style={{ paddingLeft: 10 }}
              inputProps={{
                style: { cursor: nameDisabled ? "pointer" : "auto" },
              }}
              disabled={nameDisabled}
              value={name}
              inputRef={nameInputRef}
              onChange={handleNameChange}
              onBlur={handleSubmit}
            />
          </form>
        </Button>
        <Button
          onClick={handleValueClicked}
          fullWidth
          style={{ display: "flex" }}
        >
          <Typography variant="body1" style={{ flex: 1, textAlign: "left" }}>
            =
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              size="small"
              style={{ paddingRight: 10 }}
              inputProps={{
                style: { cursor: valueDisabled ? "pointer" : "auto" },
              }}
              disabled={valueDisabled}
              placeholder={value}
              value={value}
              inputRef={valueInputRef}
              onChange={handleVariableChange}
              onBlur={handleSubmit}
            />
          </form>
        </Button>
      </div>
    );
  };

  const handleClicked = () => setPopupOpen(true);
  const handleClosed = () => setPopupOpen(false);

  return (
    <Paper className={classes.paper}>
      <div className={classes.variableWrapper}>
        {Object.keys(parser.getAll()).length !== 0 ? (
          Object.keys(parser.getAll()).map((key) => (
            <VariableField startName={key} startVal={parser.get(key)} />
          ))
        ) : (
          <h1>
            Type variables in text box (e.g. x=5) or press the button below
          </h1>
        )}
      </div>
      <IconButton
        className={classes.addButton}
        ref={iconButtonRef}
        onClick={handleClicked}
      >
        <AddIcon />
      </IconButton>
      <Popover
        open={popup}
        onClose={handleClosed}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        anchorEl={iconButtonRef.current}
      >
        <TextField style={{ padding: 10 }} autoFocus value="x=5" />
      </Popover>
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
