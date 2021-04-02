// React
import React from "react";
import PropTypes from "prop-types";

// MUI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  numPadRoot: {},
  symbolPadRoot: {},
  button: {
    flex: 1,
  },
});

export const NumPad = (props) => {
  const classes = useStyles();
  const { onClick } = props;

  const NumRow = ({ arr }) => {
    return (
      <Grid container item>
        {React.Children.toArray(
          arr.map((num) => (
            <div>
              {num !== null ? (
                <Button className={classes.button} onClick={() => onClick(num)}>
                  {num}
                </Button>
              ) : (
                <Button className={classes.button} disabled />
              )}
            </div>
          ))
        )}
      </Grid>
    );
  };
  return (
    <Grid container spacing={2}>
      <NumRow arr={[1, 2, 3]} />
      <NumRow arr={[4, 5, 6]} />
      <NumRow arr={[7, 8, 9]} />
      <NumRow arr={[null, 0, "."]} />
    </Grid>
  );
};

export const SymbolPad = (props) => {
  return (
    <div>
      <Button></Button>
    </div>
  );
};

NumPad.propTypes = {
  onClick: PropTypes.func.isRequired,
};

SymbolPad.propTypes = {
  onClick: PropTypes.func.isRequired,
};
