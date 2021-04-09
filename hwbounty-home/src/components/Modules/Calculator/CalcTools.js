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
    //flex: 1,
  },
});

const SymbolButton = (props) => {};

export const NumPad = (props) => {
  const classes = useStyles();
  const { onClick } = props;

  const NumRow = ({ arr }) => {
    return (
      <Grid container item spacing={1}>
        {React.Children.toArray(
          arr.map((num) => (
            <Grid item>
              {num !== null ? (
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={() => onClick(num)}
                >
                  {num}
                </Button>
              ) : (
                <Button className={classes.button} disabled />
              )}
            </Grid>
          ))
        )}
      </Grid>
    );
  };
  return (
    <Grid container spacing={1}>
      <NumRow arr={[1, 2, 3]} />
      <NumRow arr={[4, 5, 6]} />
      <NumRow arr={[7, 8, 9]} />
      <NumRow arr={[null, 0, "."]} />
    </Grid>
  );
};

export const SymbolPad = (props) => {
  const { onClick } = props;
  return (
    <div>
      <Grid container spacing={1}>
        <Grid container item spacing={1}>
          <Grid item>
            <Button onClick={() => onClick("\\frac")}>//frac</Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

NumPad.propTypes = {
  onClick: PropTypes.func.isRequired,
};

SymbolPad.propTypes = {
  onClick: PropTypes.func.isRequired,
};
