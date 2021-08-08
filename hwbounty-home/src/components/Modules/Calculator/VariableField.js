// React
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import DragIcon from "@material-ui/icons/DragIndicator";
import withStyles from "@material-ui/core/styles/withStyles";

// Redux
import { connect } from "react-redux";
import {
  calc_addVariable,
  calc_removeVariable,
} from "../../../redux/actions/moduleActions";

// Translation
import t from "../../../util/localization/localization";

const VariableField = (props) => {
  const { startName, startVal, scope, updateList, dragHandleProps } = props;

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

  useEffect(() => {
    setName(startName);
  }, [startName]);

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

  const handleSubmitName = (event) => {
    event.preventDefault();
    setValueDisabled(true);
    setNameDisabled(true);
    try {
      scope.replace(startName, name);
      updateList();
    } catch (err) {
      console.log(err);
      setName(startName);
    }
  };

  const handleSubmitValue = (event) => {
    event.preventDefault();
    setValueDisabled(true);
    setNameDisabled(true);

    try {
      const parsedValue = parseInt(value);
      scope.set(name, parsedValue);
      updateList();
    } catch (err) {
      console.log(err);
      setValue(startVal);
    }
  };

  const handleRemoveVariable = () => {
    scope.delete(startName);
    updateList();
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        {...dragHandleProps}
        style={{ display: "flex", alignItems: "center", paddingLeft: 10 }}
      >
        <DragIcon />
      </div>
      <Button onClick={handleNameClicked}>
        <form onSubmit={handleSubmitName}>
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
            onBlur={handleSubmitName}
          />
        </form>
      </Button>
      <Button
        onClick={handleValueClicked}
        fullWidth
        style={{ display: "flex" }}
      >
        <Typography
          variant="body1"
          style={{ flex: 1, textAlign: "left", paddingRight: 10 }}
        >
          {t("calculator.equals")}
        </Typography>
        <form onSubmit={handleSubmitValue}>
          <TextField
            variant="outlined"
            size="small"
            style={{ paddingRight: 10 }}
            inputProps={{
              style: { cursor: valueDisabled ? "pointer" : "auto" },
            }}
            disabled={valueDisabled}
            placeholder={`${value}`}
            value={value}
            inputRef={valueInputRef}
            onChange={handleVariableChange}
            onBlur={handleSubmitValue}
          />
        </form>
      </Button>
      <Button onClick={handleRemoveVariable}>
        <DeleteIcon />
      </Button>
    </div>
  );
};

VariableField.propTypes = {
  scope: PropTypes.any.isRequired,
  updateList: PropTypes.func.isRequired,
  startName: PropTypes.string.isRequired,
  startVal: PropTypes.number.isRequired,
  dragHandleProps: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  module: state.module,
});

export default connect(mapStateToProps, {
  calc_addVariable,
  calc_removeVariable,
})(VariableField);
